import WebSocket from "ws";

import Game from "./game"

export default class Manager {
    private games: Game[];
    private waiting: {
        private: { [code: string]: WebSocket}
        public: WebSocket | undefined
    }
    
    constructor() {
        this.games = [];
        this.waiting = {
            private: {},
            public: undefined
        }
    }

    private getActiveGames(): number {
        return this.games.length
    }

    private genGameCode(): string {
        return (Math.random() + 1).toString(36).substring(5);
    }

    // create/join public or private game based on url.
    enter(user: WebSocket, room: {type: string, code: string | undefined}): string | undefined {
        // PUBLIC GAME
        if (room.type === "public") {
            if (!this.waiting.public) {
                this.waiting.public = user;
                user.send("[game]: connected, waiting for another player to join");
                return;
            }
    
            let game = new Game("PUBLIC", this.waiting.public, user);
            this.games.push(game);
            this.waiting.public = undefined;

            return `game created; active games: ${this.getActiveGames()}`;
        }

        // PRIVATE GAME
        if (room.type === "private") {
            // CREATE PRIVATE GAME
            if (!room.code) {
                let code = this.genGameCode();
                this.waiting.private[code] = user;

                user.send(`[game]: game code: ${code}, waiting for opponent`);
                return "private game created; waiting for second player.";
            }

            // JOIN PRIVATE GAME
            if (!(room.code in this.waiting.private)) {
                user.send("[server]: no game found with this code");
                user.close();
                return;
            }
            
            // add code to game later?
            let game = new Game("PRIVATE", this.waiting.private[room.code], user);
            this.games.push(game);
            delete this.waiting.private[room.code];
            
            return `private game started; active games: ${this.getActiveGames()}`;
        }
    }

   exit(user: WebSocket): string | undefined {
        if (user === this.waiting.public) {
            this.waiting.public = undefined;
            return "user disconnected, was waiting for a public game";
        }

        for (let code in this.waiting.private) {
            if (this.waiting.private[code] === user) {
                delete this.waiting.private[code];
                return "user disconnected, was waiting for a private game";
            }
        }

        let game = this.games.find((game) => game.hasUser(user));
        if (game?.getStatus() === "ACTIVE") {
            game.wasLeftBy(user);
            this.games = this.games.filter((cur) => cur === game);
            return "user disconnected, match abandoned";
        }
    }
}