import WebSocket from "ws";
import { Chess, Color, Move } from "chess.js";

import User from "./user";
import Player from "./player";

import { GameStatus, GameType } from "../bin/types";
import { MOVE, RESIGN } from "../bin/messages";
import { genRandomStr } from "../bin/helpers";

// currently using tell, listen, tellOther and tellBoth as names for socket comms, might change later.
// redundant data? : game type, player num

export default class Game { 
    private id: string;
    private type: GameType;
    private status: GameStatus;
    private playerOne: Player;
    private playerTwo: Player;
    private chess: Chess;
    // private moves: Array<Move>

    constructor(type: GameType, userOne: User, userTwo: User) {
        let [p1Color, p2Color] = this.rngColor();

        this.id = genRandomStr();
        this.type = type;
        this.status = "ACTIVE";
        this.playerOne = new Player(userOne, p1Color);
        this.playerTwo = new Player(userTwo, p2Color);
        this.chess = new Chess();

        this.tellBoth(`[game]: both players connected, game has begun`);
        this.tellOne("w", "[game]: you are assigned white. it's your turn");
        this.tellOne("b", "[game]: you are assigned black. it's opp's turn");

        this.listen(this.playerOne);
        this.listen(this.playerTwo);
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
        [this.playerOne, this.playerTwo].forEach((player) => {
            if (player.COLOR === color) player.tell(message);
        });
    }

    private tellBoth(message: string) {
        this.playerOne.tell(message);
        this.playerTwo.tell(message);
    }

    endedBy(userID: string) {
        let message = `[game]: opp has ${this.status === "RESIGNED" ? "resigned" : "left"}, game has ended`;
        this.status = "END";
        [this.playerOne, this.playerTwo].forEach((player) => {
            if (userID === player.ID) return;
            player.tell(message);
            player.exit();
        });
    }

    hasUser(userID: string): boolean {
        if (userID === this.playerOne.ID) return true;
        if (userID === this.playerTwo.ID) return true;
        return false;
    }

    get ID(): string {
        return this.id;
    }

    get STATUS(): GameStatus {
        return this.status;
    }
}