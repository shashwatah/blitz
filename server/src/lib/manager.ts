import WebSocket from "ws";

import Game from "./game"

export default class Manager {
    private games: Game[];
    private waiting: WebSocket | undefined;
    
    constructor() {
        this.games = [];
        this.waiting = undefined;
    }

    // create/join public or private game based on url.
    manage(ws: WebSocket, type: string, code: string | undefined): string | undefined {
        // PUBLIC GAME
        if (type === "pub") {
            if (!this.waiting) {
                this.waiting = ws;
                ws.send("[game]: connected, waiting for another player to join");
                return;
            }
    
            let game = new Game(this.waiting, ws);
            this.games.push(game);
            this.waiting = undefined;

            return `[ws]: game created; active games: ${this.getActiveGames()}`;
        }

        // PRIVATE GAME
        if (type === "pvt") {
            ws.send("[server] [ws]: wip");
            ws.close();

            return `[ws]: user tried to ${code ? "join" : "create"} a private game${code ? ", code: " + code : ""}`;
        }
    }

    private getActiveGames(): number {
        return this.games.length
    }
}