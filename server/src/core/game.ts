import WebSocket from "ws";
import { Chess, Move} from "chess.js";

import { GameStatus, PlayerColor, PlayerNum } from "../lib/types";
import { MOVE } from "../lib/messages";

import Player from "./player";

// currently using tell, listen, tellOther and tellBoth as names for socket comms, might change later.

export default class Game { 
    private playerOne: Player;
    private playerTwo: Player;
    private chess: Chess;
    private status: GameStatus;
    private turn: PlayerNum;
    // private moves: Array<Move>

    constructor(p1Socket: WebSocket, p2Socket: WebSocket) {
        let [p1Color, p2Color] = this.rngColor();

        this.playerOne = new Player(p1Socket, "ONE", p1Color);
        this.playerTwo = new Player(p2Socket, "TWO", p2Color);
        this.chess = new Chess();
        this.status = "ACTIVE";
        this.turn = p1Color === "WHITE" ? "ONE" : "TWO";

        this.listen(this.playerOne);
        this.listen(this.playerTwo);
    }

    private rngColor(): [PlayerColor, PlayerColor] {
        return Math.random() < 0.5 ? 
            ["WHITE", "BLACK"] : 
            ["BLACK", "WHITE"];
    }

    private toggleTurn() {
        this.turn = this.turn === "ONE" ? "TWO" : "ONE";
    }

    private listen(player: Player) {
        player.listen((data: WebSocket.RawData) => {
            // parsing incoming message, this returns 'any' data. 
            const message = JSON.parse(data.toString()); // needs try block?
            
            // checking if the player sending the message is in turn
            // will check with player id or color (wrt chess.js) later
            if (player.getNumber() !== this.getTurn()) {
                player.tell("[game]: not your turn");
                return;
            }

            // sample white move 1: {"type": "move", "data": {"from": "b2", "to": "b4"}}
            // MOVE 
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
                this.tellOther(`[opp]: ${moveMsg}`);
                this.tellBoth(`[game]: board: \n${this.getBoard()}`);

                this.toggleTurn();
            }
        });
    }   

    private tellOther(message: string) {
        this.playerOne.getNumber() === this.turn ?
            this.playerOne.tell(message) :
            this.playerTwo.tell(message);
    }

    tellBoth(message: string) {
        this.playerOne.tell(message);
        this.playerTwo.tell(message);
    }

    getStatus() {
        return this.status;
    }

    getBoard() {
        return this.chess.ascii();
    }

    getTurn() {
        return this.turn;
    }
}