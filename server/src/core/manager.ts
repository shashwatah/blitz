import WebSocket from "ws";
import Game from "./game"
import { PlayerNum } from "../lib/types";

export default class Manager {
    private games: Game[];
    private waiting: WebSocket | undefined; // will be Player | undefined later
    
    constructor() {
        this.games = [];
        this.waiting = undefined;
    }

    manage(ws: WebSocket): PlayerNum | undefined {
        if (!this.waiting) {
            this.waiting = ws;
            ws.send("[game]: connected, waiting for another player to join.");
            return undefined;
        }

        let game = new Game(this.waiting, ws);
        this.games.push(game);
        this.waiting = undefined;
        game.tellBoth(`[game]: both players connected, game has begun; current turn: ${game.getTurn()}`);
        return game.getTurn();
    }

    getGamesNum(): number {
        return this.games.length
    }
}