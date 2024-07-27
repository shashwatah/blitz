import WebSocket from "ws";
import { Chess, Move} from "chess.js";

import { GameStatus, PlayerColor, PlayerNum, Message} from "./types";
import { MOVE } from "./messages";

import Player from "./player";

// sample move for w m1: {"type": "move", "move": {"from": "b2", "to": "b4"}}

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
            const message: Message = JSON.parse(data.toString()); // needs try block?

            // the chessboard (chess.js) is agnostic to the state of the game (i.e which player is black/white)
            // it is important that chess.turn stays is sync with this.turn for the the game to function properly
            //   could also check if the current players color matches chess.turn 
            //   but this condition will later check for playerid
            if (player.getNumber() !== this.getTurn()) {
                player.tell("[server] [ws] [game]: not your turn");
                return;
            }

            if (message.type === MOVE && message.move) {
                let move: Move;
                try {
                    move = this.chess.move({
                        from: message.move.from,
                        to: message.move.to
                    });
                } catch (err) {
                    player.tell("[server] [ws] [game]: invalid move");
                    return;
                }
                let moveMsg = `moved ${move.piece} from ${move.from} to ${move.to}`;

                console.log(`\n[ws]: player ${this.getTurn().toLowerCase()} ${moveMsg}`);
                console.log(`\n[ws]: board: \n${this.getBoard()}`);
                player.tell(`[server] [ws] [game]: you ${moveMsg}`);

                this.toggleTurn();
            }
        });
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