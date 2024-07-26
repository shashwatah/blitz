import WebSocket from "ws";
import { Chess } from "chess.js";

import { GameStatus, PlayerColor, PlayerNum } from "./types";

import Player from "./player";

export default class Game { 
    private playerOne: Player;
    private playerTwo: Player;
    private chess: Chess;
    private status: GameStatus;
    private turn: PlayerNum;
    // private moves: Array<Move>

    constructor(p1WS: WebSocket, p2WS: WebSocket) {
        let [p1Color, p2Color] = this.rngColor();

        this.playerOne = new Player(p1WS, p1Color);
        this.playerTwo = new Player(p2WS, p2Color);
        this.chess = new Chess();
        this.status = "ACTIVE";
        this.turn = p1Color === "WHITE" ? "ONE" : "TWO";
    }

    private rngColor(): [PlayerColor, PlayerColor] {
        return Math.random() < 0.5 ? 
            ["WHITE", "BLACK"] : 
            ["BLACK", "WHITE"];
    }

    getStatus() {
        return this.status;
    }
}