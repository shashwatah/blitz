import WebSocket from "ws";
import { Chess, Color, Move } from "chess.js";

import User from "./user";
import Player from "./player";

import { GameStatus } from "../utils/types";
import { genRandomStr } from "../utils/helpers";

import { MOVE, RESIGN } from "../utils/messages";
import { INIT, YOUMV, OPPMV, END, WARN, ERROR} from "../utils/messages";
import { BADMSG, BADJSON, BADTURN, BADMOVE } from "../utils/messages";
import { YOURSG, OPPRSG, OPPDSC, YOUWON, OPPWON } from "../utils/messages";
import { TIMEOUT } from "../utils/messages";

export default class Game { 
    private id: string;
    private status: GameStatus;
    private chess: Chess;
    private players: { [key: string]: Player } = {};
    private timestamp: number = 0;
    private timer: NodeJS.Timeout | undefined;
    // private type: GameType;      // might need it later
    // private moves: Array<Move>   // move history, chess.history??

    constructor(userOne: User, userTwo: User) {
        let [colorOne, colorTwo] = this.rngColor();

        this.id = genRandomStr();
        this.status = "ACTIVE";
        this.chess = new Chess();
        
        this.players[colorOne] = new Player(userOne, colorOne);
        this.players[colorTwo] = new Player(userTwo, colorTwo);

        ["w", "b"].forEach(color => {
            this.players[color].tell(JSON.stringify({type: INIT, data: {id: this.id, color: color}}));
        });

        this.setTimer();

        this.listen(this.players["w"]);
        this.listen(this.players["b"]);
    }

    private rngColor(): [Color, Color] {
        return Math.random() < 0.5 ? 
            ["w", "b"] : 
            ["b", "w"];
    }

    private setTimer(prevTurn ?: Color) {
        let currentTime = new Date().getTime();

        if (prevTurn) {
            clearTimeout(this.timer);
            this.players[prevTurn].remTime -= currentTime - this.timestamp; 
            console.log(`time remaining for ${prevTurn} = ${this.players[prevTurn].remTime/1000}s`);
        } 

        this.timestamp = currentTime;
        this.timer = setTimeout((game: Game) => {
            game.status = "TIMEOUT";

            let player = game.players[game.chess.turn()];
            player.tell(JSON.stringify({type: END, cause: OPPWON, by: TIMEOUT}));
            player.exit();
        }, this.players[this.chess.turn()].remTime, this);
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
                this.players[this.chess.turn()].tell(JSON.stringify({type: OPPMV, move: move}));
             
                this.setTimer(player.COLOR);

                return;
            }

            player.tell(JSON.stringify({type: ERROR, cause: BADMSG}));
        });
    }   

    end(loserID: string) {
        let player = loserID === this.players["w"].ID ?
                     this.players["b"] : this.players["w"]; 
        
        let cause;
        if (this.status === "ACTIVE") cause = OPPDSC;
        if (this.status === "RESIGNED") cause =  OPPRSG;
        if (this.status === "TIMEOUT") cause = YOUWON;

        let by;
        if (this.status === "TIMEOUT") by = TIMEOUT;

        this.status = "END";

        player.tell(JSON.stringify({type: END, cause: cause, by: by}));
        player.exit();
    }

    hasUser(userID: string): boolean {
        if (userID === this.players["w"].ID) return true;
        if (userID === this.players["b"].ID) return true;
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