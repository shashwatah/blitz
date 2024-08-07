import WebSocket from "ws";
import { Chess, Color, Move } from "chess.js";

import User from "./user";
import Player from "./player";

import { GameStatus } from "../utils/types";
import { MOVE, RESIGN } from "../utils/messages";
import { START } from "../utils/messages";
import { genRandomStr } from "../utils/helpers";

// currently using tell, listen, tellOther and tellBoth as names for socket comms, might change later.
// redundant data? : game type, player num

export default class Game { 
    private id: string;
    private status: GameStatus;
    private players: Player[];
    private chess: Chess;
    // private type: GameType;      // might need it later
    // private moves: Array<Move>   // move history, chess.history??

    constructor(userOne: User, userTwo: User) {
        let [color1, color2] = this.rngColor();

        this.id = genRandomStr();
        this.status = "ACTIVE";
        this.players = [new Player(userOne, color1), new Player(userTwo, color2)];
        this.chess = new Chess();

        // merge into one later? will have to change tell funcs
        this.tellOne("w", JSON.stringify({type: START, data: {color: "w"}}));
        this.tellOne("b", JSON.stringify({type: START, data: {color: "b"}}));

        this.listen(this.players[0]);
        this.listen(this.players[1]);
    }

    private rngColor(): [Color, Color] {
        return Math.random() < 0.5 ? 
            ["w", "b"] : 
            ["b", "w"];
    }

    private listen(player: Player) {
        player.listen((data: WebSocket.RawData) => {
            // parsing incoming message, this returns 'any' data. 
            let message;
            try {
                message = JSON.parse(data.toString());
            } catch (err) {
                player.tell("[server] [ws]: invalid message: json error")
                return;
            }

            // RESIGN
            // can be done out of turn
            // msg: {"type": "resign"}
            if (message.type === RESIGN) {
                this.status = "RESIGNED";
                player.tell("[game]: you have resigned, game has ended");
                player.exit();
            }
         
            // checking if the player sending the message is in turn
            // will check with player id or color (wrt chess.js) later
            if (player.COLOR !== this.chess.turn()) {
                player.tell("[game]: not your turn");
                return;
            }

            // MOVE 
            // WM1: {"type": "move", "data": {"from": "b2", "to": "b4"}}
            if (message.type === MOVE) {
                // should type guards be used here?
                let move: Move;

                // chess.history, .incheck, ischeckmate, isdraw, isinsuffiecentmaterial, isstalemate, isgameover,
                // isattacked, isthreefoldrep
                // movenumber, moves
                // use chess.js on frontend?

                // checks:
                //  piece belongs to the player moving?
                //  piece promoting is a pawn?

                // validation
                // make move
                //  return error in case: invalid move
                // return data: 
                //  what? should i the entirety of the current state of chessboard?
                //  or only that the move was successfull? and move data, available moves

                try {
                    move = this.chess.move({
                        from: message.data.from,
                        to: message.data.to
                    });
                } catch (err) {
                    player.tell("[game]: invalid move");
                    return;
                }
                
                let moveMsg = `moved ${move.piece} from ${move.from} to ${move.to}`;
                player.tell(`[you]: ${moveMsg}`);
                this.tellOne(player.COLOR === "w" ? "b" : "w", `[opp]: ${moveMsg}`);
                this.tellBoth(`[game]: board: \n${this.chess.ascii()}`);

                return;
            }

            player.tell("[server] [ws]: invalid message");
        });
    }   

    private tellOne(color: Color, message: string) {
        this.players.forEach((player) => {
            if (player.COLOR === color) player.tell(message);
        });
    }

    private tellBoth(message: string) {
        this.players[0].tell(message);
        this.players[1].tell(message);
    }

    endedBy(userID: string) {
        let message = `[game]: opp has ${this.status === "RESIGNED" ? "resigned" : "left"}, game has ended`;
        this.status = "END";
        this.players.forEach((player) => {
            if (userID === player.ID) return;
            player.tell(message);
            player.exit();
        });
    }

    hasUser(userID: string): boolean {
        if (userID === this.players[0].ID) return true;
        if (userID === this.players[1].ID) return true;
        return false;
    }

    get ID(): string {
        return this.id;
    }

    get STATUS(): GameStatus {
        return this.status;
    }
}