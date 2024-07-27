import WebSocket from "ws";
import { Chess } from "chess.js";

import { GameStatus, PlayerColor, PlayerNum } from "./types";
import { MOVE } from "./messages";

import Player from "./player";

// which player is one (vice versa)?
// player id instead of player number?
// add listener function and nomenclature
//  should it be in a different file?

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

        this.addListenerToPlayers();
    }

    private rngColor(): [PlayerColor, PlayerColor] {
        return Math.random() < 0.5 ? 
            ["WHITE", "BLACK"] : 
            ["BLACK", "WHITE"];
    }

    private toggleTurn() {
        this.turn = this.turn === "ONE" ? "TWO" : "ONE";
    }

    private addListenerToPlayers() {
        [this.playerOne, this.playerTwo].forEach((player, i) => {
            player.listen((data: WebSocket.RawData) => {
                const message = data.toString();

                if (this.status !== "ACTIVE") {
                    player.tell("[server] [ws]: game is not active");
                    return;
                }

                if (message === MOVE) {
                    if (player.getNumber() !== this.turn) {
                        player.tell("[server] [ws] [game]: this not your turn");
                        return;
                    }
                    console.log(`[ws] [game]: player ${player.getNumber().toLowerCase()} made a move`)
                    player.tell("[server] [ws] [game]: you made a move");

                    this.toggleTurn();
                }
            });
        });
    }

    getStatus() {
        return this.status;
    }

    getBoard() {
        return this.chess.ascii();
    }
}