import WebSocket from "ws";

import Game from "./game"

// User & Player:
//      currently a websocket connection is being treated as a user which gets added into a player
//      user will eventually be a class of its own, holding socket (& its methods) & data (id, name etc)
//      this object will be passed around in enter and exit funcs, enabling user checks with id
//      this user will eventually get promoted to the player class which extends it, holding data specific to the game its in

// Game End:
//      currently the game ends with game.endedBy func call when a player exits.
//      this is fine as long as the end condition is caused by one player: exit or resign
//      when the game ends naturally a different end function will be needed.
//      and, if a game ends the only way it can have the manager respond to that state change is if a user leaves.

export default class Manager {
    private games: Game[];
    private waiting: {
        private: { [code: string]: WebSocket }
        public?: WebSocket
    }
    
    constructor() {
        this.games = [];
        this.waiting = {
            private: {},
            public: undefined
        }
    }

    private get GAMESN(): number {
        return this.games.length
    }

    private genGameCode(): string {
        return (Math.random() + 1).toString(36).substring(5);
    }

    // create/join public or private game based on url.
    enter(user: WebSocket, room: {type: string, code?: string}): string | undefined {
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

            return `game created; active games: ${this.GAMESN}`;
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
            
            return `private game started; active games: ${this.GAMESN}`;
        }
    }

    // handle the conditions when the player was in the middle of something when leaving
    exit(user: WebSocket): string | undefined {
        // if user is waiting for a public game
        if (user === this.waiting.public) {
            this.waiting.public = undefined;
            return "user disconnected, was waiting for a public game";
        }

        // if user is waiting for a private game
        for (let code in this.waiting.private) {
            if (this.waiting.private[code] === user) {
                delete this.waiting.private[code];
                return "user disconnected, was waiting for a private game";
            }
        }

        // if user left a game by quitting the session or in game action (resign)
        let game = this.games.find((game) => game.hasUser(user));
        if (!game || game.STATUS === "END") return;
        game.endedBy(user);
        this.games = this.games.filter((cur) => cur === game);
        return "user disconnected, match ended";
    }
}