import { writable, type Writable, type Readable } from "svelte/store";
import { Chess, type Color } from "chess.js";

import type { GameStatus, GameType } from "../types/general";
import { INIT, WAIT, ERROR } from "../utils/messages";
import { BADCODE } from "../utils/messages";

// todo:
//      refine controller
//      dotenv config, remove ws 
//      game setup: 
//          loading msg
//          redo create game setup
//      game page, chessboard

// much better than before, not bad at all
// but still needs a few updates
class Game {
    private id: string | undefined = undefined;
    private socket: WebSocket | undefined = undefined;
    private color: Color | undefined = undefined;
    private status: Writable<GameStatus> = writable("INACTIVE");
    private chess: Writable<Chess> = writable(new Chess());

    constructor() {
        this.status.subscribe((status) => {
            if (status === "CONNFAIL") {
                console.log("[game]: connection failed");
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
        this.color = undefined
        this.status.set("INACTIVE");
        this.chess.set(new Chess());
    }

    connect(type: GameType, code?: string) {
        this.socket = new WebSocket(`ws://localhost:108/game/${type?.toLowerCase()}${code ? "/"+code : ""}`);
        // should a conn error be handled here?
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
                if (message.code) console.log(`[server]: game code: ${message.code}`);
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
        }
    }

    disconnect() {
        // something similar will happen when the game ends naturally as well
        this.socket?.close();
        this.status.set("RESET");
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