import WebSocket from "ws";

import Game from "./game"

export default class Manager {
    private games: Game[];
    private waiting: { 
        games: {
            user: WebSocket,
            code: string,
        }[], 
        user: WebSocket | undefined
    };
    
    constructor() {
        this.games = [];
        this.waiting = {
            games: [],
            user: undefined
        }
    }

    // create/join public or private game based on url.
    manage(ws: WebSocket, type: string, code: string | undefined): string | undefined {
        // PUBLIC GAME
        if (type === "public") {
            if (!this.waiting.user) {
                this.waiting.user = ws;
                ws.send("[game]: connected, waiting for another player to join");
                return;
            }
    
            let game = new Game("PUBLIC", this.waiting.user, ws);
            this.games.push(game);
            this.waiting.user = undefined;

            return `[ws]: game created; active games: ${this.getActiveGames()}`;
        }

        // PRIVATE GAME
        if (type === "private") {
            // CREATE PRIVATE GAME
            if (!code) {
                let waiting = {
                    user: ws,
                    code: (Math.random() + 1).toString(36).substring(5) // generateCode() later
                };
                this.waiting.games.push(waiting);

                ws.send(`[server] [ws]: game code: ${waiting.code}, waiting for opponent`);
                return "[ws]: private game created; waiting for second player.";
            }

            // JOIN PRIVATE GAME
            let waiting = this.waiting.games.find((wGame) => wGame.code === code);

            if (!waiting) {
                ws.send("[server] [ws]: no game found with this code");
                ws.close();
                return;
            }
            
            // add code to game later?
            let game = new Game("PRIVATE", waiting.user, ws);
            this.games.push(game);
            console.log(this.waiting.games);
            this.waiting.games = this.waiting.games.filter((wGame) => wGame.code !== code);
            console.log(this.waiting.games);
            return `[ws]: private game started; active games: ${this.getActiveGames()}`;
        }
    }

    private getActiveGames(): number {
        return this.games.length
    }
}