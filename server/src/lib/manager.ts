import Game from "./game"
import User from "./user";

import { genRandomStr } from "../utils/helpers";
import { WAITING, ERROR } from "../utils/messages";
import { BADCODE } from "../utils/messages";

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

    // use some kind of logger instead of returning msgs to ws?
    // create/join public or private game based on url.
    manageEntry(user: User, reqGame: {type: string, code?: string}): string | undefined {
        // PUBLIC GAME
        if (reqGame.type === "public") {
            if (!this.waiting.public) {
                this.waiting.public = user;
                user.tell(JSON.stringify({type: WAITING}));
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

                user.tell(JSON.stringify({type: WAITING, code: code}));
                return "private game created; waiting for second player.";
            }

            // JOIN PRIVATE GAME
            if (!(reqGame.code in this.waiting.private)) {
                user.tell(JSON.stringify({type: ERROR, error: BADCODE}));
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