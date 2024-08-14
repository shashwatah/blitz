import { writable, type Writable, type Readable } from "svelte/store";

import { Chess, type Color } from "chess.js";

import type { GameStatus, GameType } from "../types/general";
import { INIT, WAIT, ERROR, END, YOURSG } from "../utils/messages";
import { BADCODE, OPPDSC, OPPRSG } from "../utils/messages";
import { RESIGN } from "../utils/messages";

// much better than before, not bad at all
// but still needs a few updates
class Game {
    private id: string | undefined = undefined;
    private socket: WebSocket | undefined = undefined;

    // will change these two members later (maybe a game data object?)
    // also the name color feels wrong since it's just the player's color
    private code: string | undefined = undefined;
    private color: Color | undefined = undefined;
    
    private status: Writable<GameStatus> = writable("INACTIVE");
    private chess: Writable<Chess> = writable(new Chess());

    constructor() {
        this.status.subscribe((status) => {
            if (status === "CONNFAIL") {
                console.log("[game]: connection failed");
                this.status.set("RESET");
            }

            if (status === "END") {
                console.log("[game]: game has ended");
                this.status.set("RESET");
            }

            if (status === "RESET") {
                console.log("[game]: resetting controller");
                this.reset();
            }
        }) 
    }

    private reset() {
        this.id = undefined;
        this.socket = undefined;
        this.code = undefined;
        this.color = undefined
        this.status.set("INACTIVE");
        this.chess.set(new Chess());
    }

    connect(type: GameType, code?: string) {
        let port = import.meta.env.VITE_PORT;
        let host = import.meta.env.VITE_HOST || "localhost";

        this.socket = new WebSocket(`ws://${host}:${port}/game/${type?.toLowerCase()}${code ? `/${code}` : ""}`);
        
        this.socket.onerror = (event) => {
            console.log(event);
            this.status.set("RESET");
        }
        
        this.socket.onopen = () => {
            this.listen();
        }
    }

    listen() {
        if (!this.socket) return;

        this.socket.onmessage = (event) => {
            let message = JSON.parse(event.data);

            if (message.type === ERROR) {
                if (message.error === BADCODE) {
                    console.log("[server]: bad game code");
                    this.status.set("CONNFAIL");
                }
            }

            if (message.type === WAIT) {
                console.log("[server]: waiting for opponent");
                if (message.code) console.log(`[server]: game code: ${message.code}`)
                this.code = message.code;
                this.status.set("WAITING");
            }

            if (message.type === INIT) {
                this.id = message.data.id;
                this.color = message.data.color;
                console.log(`[server]: game started; game id: ${this.id}; assigned color: ${this.color}`)
                this.status.set("ACTIVE");

                // making white move just for test
                setTimeout(() => {
                    this.chess.update(chess => {
                        chess.move({from: "e2", to: "e4"});
                        return chess;
                    });
                }, 5000);
            }

            if (message.type === END) {
                if (message.cause === OPPDSC) console.log("[server]: opp has disconnected");
                if (message.cause === OPPRSG) console.log("[server]: opp has resigned");
                if (message.cause === YOURSG) console.log("[server]: you have resigned");

                this.status.set("END");
            }
        }
    }

    resign() {
        this.socket?.send(JSON.stringify({type: RESIGN}));
    }

    // this is only being used in / currently, to disconnect while waiting
    // might change it later
    disconnect() {
        this.socket?.close();
        this.status.set("RESET");
    }
    
    get CODE(): string | undefined {
        return this.code; 
    }

    get COLOR(): Color | undefined {
        return this.color;
    }

    get STATUS(): Readable<GameStatus> {
        return this.status;
    }

    get CHESS(): Readable<Chess> {
        return this.chess;
    }
}

export default new Game(); 