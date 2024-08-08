import WebSocket from "ws";
import { Chess, Color, Move } from "chess.js";

import User from "./user";
import Player from "./player";

import { GameStatus } from "../utils/types";
import { genRandomStr } from "../utils/helpers";

import { MOVE, RESIGN } from "../utils/messages";
import { INIT, YOUMV, OPPMV, END, WARN, ERROR} from "../utils/messages";
import { BADMSG, BADJSON, BADTURN, BADMOVE } from "../utils/messages";
import { YOURSG, OPPRSG, OPPDSC } from "../utils/messages";

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
        this.tellOne("w", JSON.stringify({type: INIT, color: "w"}));
        this.tellOne("b", JSON.stringify({type: INIT, color: "b"}));

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
            let message;
            try {
                message = JSON.parse(data.toString());
            } catch (err) {
                player.tell(JSON.stringify({type: ERROR, cause: BADJSON}))
                return;
            }

            // RESIGN
            // can be done out of turn
            // msg: {"type": "resign"}
            if (message.type === RESIGN) {
                this.status = "RESIGNED";
                player.tell(JSON.stringify({type: END, cause: YOURSG}));
                player.exit();
            }
         
            if (player.COLOR !== this.chess.turn()) {
                player.tell(JSON.stringify({type: WARN, cause: BADTURN}));
                return;
            }

            // MOVE 
            // WM1: {"type": "move", "move": {"from": "b2", "to": "b4"}}
            if (message.type === MOVE) {
                // should type guards be used here?
                let move: Move;

                // chess.history, .incheck, ischeckmate, isdraw, isinsuffiecentmaterial, isstalemate, isgameover,
                // isattacked, isthreefoldrep
                // movenumber, moves
                // checks:
                //      piece belongs to the player moving?
                //      piece promoting is a pawn?

                try {
                    move = this.chess.move({
                        from: message.move.from,
                        to: message.move.to
                    });
                } catch (err) {
                    player.tell(JSON.stringify(JSON.stringify({type: WARN, cause: BADMOVE})));
                    return;
                }
                
                player.tell(JSON.stringify({type: YOUMV, move: move}));
                this.tellOne(player.COLOR === "w" ? "b" : "w", JSON.stringify({type: OPPMV, move: move}));
                return;
            }

            player.tell(JSON.stringify({type: ERROR, cause: BADMSG}));
        });
    }   

    private tellOne(color: Color, message: string) {
        this.players.forEach((player) => {
            if (player.COLOR === color) player.tell(message);
        });
    }

    endedBy(userID: string) {
        let cause = this.status === "RESIGNED" ? OPPRSG : OPPDSC;
        this.status = "END";
        this.players.forEach((player) => {
            if (userID === player.ID) return;
            player.tell(JSON.stringify({type: END, cause: cause}));
            player.exit();
        });
    }

    hasUser(userID: string): boolean {
        if (userID === this.players[0].ID) return true;
        if (userID === this.players[1].ID) return true;
        return false;
    }

    // change getters to lowercase by using _ before members?
    get ID(): string {
        return this.id;
    }

    get STATUS(): GameStatus {
        return this.status;
    }
}