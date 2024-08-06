import { readable, writable, type Readable, type Writable } from "svelte/store";

import type { GameType, GameStatus } from "./general.types";
import { Chess, type Color } from "chess.js";

class Game {
    private socket: WebSocket | undefined = undefined;
    public status: Writable<GameStatus> = writable("INACTIVE");
    private chess: Chess = new Chess();
    public userColor: Writable<Color> = writable("w");

    private listen() {
        if (!this.socket) return;
        
        this.socket.onmessage = (event) => {
            console.log(event.data);

            if (event.data === "[game]: both players connected, game has begun") {
                this.status.set("ACTIVE")
            }

            if (event.data === "[game]: you are assigned black. it's opp's turn") {
                this.userColor.set("b")
            }
        }
    }

    connect(gameType: GameType, code?: string) {
        this.socket = new WebSocket(`ws://localhost:108/game/${gameType?.toLowerCase()}${code ? "/"+code : ""}`);
        this.socket.onopen = (event) => {
            this.listen();
            return;
        }
        this.status.set("CONNFAIL");
    }

    get BOARD() {
        return this.chess.board();
    }    

    get STATUS(): Writable<GameStatus> {
        return this.status;
    }

    get COLOR(): Writable<Color>{
        return this.userColor;
    }
}

export const game: Readable<Game> = readable(new Game());