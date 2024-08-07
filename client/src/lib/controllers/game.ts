import { writable, type Writable, type Readable } from "svelte/store";
import { Chess, type Color } from "chess.js";

import type { GameStatus, GameType } from "../types/general";
import { START, WAITING, ERROR } from "../utils/messages";
import { BADCODE } from "../utils/messages";

// much better than before, not bad at all
// but still needs a few updates
class Game {
    private socket: WebSocket | undefined = undefined;
    private type: GameType | undefined = undefined;
    private code: string | undefined = undefined;
    private status: Writable<GameStatus> = writable("INACTIVE");
    private chess: Writable<Chess> = writable(new Chess());
    private color: Writable<Color | undefined> = writable(undefined);

    constructor() {
        // logging messages based on changes in status and color inside contructor
        // might change this later

        this.status.subscribe((status) => {
            if (status === "CONNFAIL") {
                console.log("connection failed");
                this.status.set("RESET");
            }

            if (status === "RESET") {
                console.log("resetting game")
                this.reset();
            }

            if (status === "WAITING") {
                console.log(`${this.type?.toLowerCase()} game created${this.type === "PRIVATE" ? `, code: ${this.code}` : ""}`);
                console.log(`waiting for ${this.type === "PRIVATE" ? "opponent" : "another player"} to join`);
            }

            if (status === "ACTIVE") console.log("another player has joined, game has begun");
        }) 

        this.color.subscribe((color) => {
            if (color) 
                console.log(`you are assigned: ${color}, it's ${color === "w" ? "your" : "opp's"} turn`)
        })
    }

    private reset() {
        this.socket = undefined;
        this.type = undefined;
        this.code = undefined;
        this.status.set("INACTIVE");
        this.chess.set(new Chess());
        this.color.set(undefined);
    }

    connect(type: GameType, code?: string) {
        this.socket = new WebSocket(`ws://localhost:108/game/${type?.toLowerCase()}${code ? "/"+code : ""}`);

        this.socket.onopen = () => {
            this.type = type;
            this.listen();
        }
    }

    listen() {
        if (!this.socket) return;
        this.socket.onmessage = (event) => {
            let message = JSON.parse(event.data);

            if (message.type === ERROR) {
                if (message.error === BADCODE) {
                    console.log("no game exists with this code")
                    this.status.set("CONNFAIL");
                }
            }

            if (message.type === WAITING) {
                this.code = message.code;
                this.status.set("WAITING");
            }

            if (message.type === START) {
                this.status.set("ACTIVE");
                this.color.set(message.data.color);
                
                // making white move just for test
                setTimeout(() => {
                    this.chess.update(chess => {
                        chess.move({from: "e2", to: "e4"});
                        return chess;
                    });
                }, 5000);
            }
        }
    }

    disconnect() {
        // something similar will happen when the game ends naturally as well
        this.socket?.close();
        this.status.set("RESET");
    }

    get STATUS(): Readable<GameStatus> {
        return this.status;
    }

    get CHESS(): Readable<Chess> {
        return this.chess;
    }

    get COLOR(): Readable<Color | undefined> {
        return this.color;
    }
}

export default new Game(); 