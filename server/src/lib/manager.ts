import Game from "./game"
import User from "./user";

import { genRandomStr } from "../bin/helpers";

// Game End:
//      currently the game ends with game.endedBy func call when a player exits.
//      this is fine as long as the end condition is caused by one player: exit or resign
//      when the game ends naturally a different end function will be needed.
//      and, if a game ends the only way it can have the manager respond to that state change is if a user leaves.

export default class Manager {
    private games: Game[];
    private waiting: {
        private: { [code: string]: User }
        public?: User
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

    // create/join public or private game based on url.
    manageEntry(user: User, reqGame: {type: string, code?: string}): string | undefined {
        // PUBLIC GAME
        if (reqGame.type === "public") {
            if (!this.waiting.public) {
                this.waiting.public = user;
                user.tell("[game]: connected, waiting for another player to join");
                return;
            }
    
            let game = new Game(this.waiting.public, user);
            this.games.push(game);
            this.waiting.public = undefined;

            return `game created; active games: ${this.GAMESN}`;
        }

        // PRIVATE GAME
        if (reqGame.type === "private") {
            // CREATE PRIVATE GAME
            if (!reqGame.code) {
                let code = genRandomStr();
                this.waiting.private[code] = user;

                user.tell(`[game]: game code: ${code}, waiting for opponent`);
                return "private game created; waiting for second player.";
            }

            // JOIN PRIVATE GAME
            if (!(reqGame.code in this.waiting.private)) {
                user.tell("[server]: no game found with this code");
                user.exit();
                return;
            }
            
            // add code to game later?
            let game = new Game(this.waiting.private[reqGame.code], user);
            this.games.push(game);
            delete this.waiting.private[reqGame.code];
            
            return `private game started; active games: ${this.GAMESN}`;
        }
    }

    // handle the conditions when the player was in the middle of something when leaving
    manageExit(user: User): string | undefined {
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
        let game = this.games.find((game) => game.hasUser(user.ID));
        if (!game || game.STATUS === "END") return;
        game.endedBy(user.ID);
        this.games = this.games.filter((g) => g.ID !== game.ID);
        return "user disconnected, match ended";
    }
}