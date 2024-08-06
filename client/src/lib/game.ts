import { writable, type Writable, type Readable } from "svelte/store";

import { Chess, type Color } from "chess.js";

import type { GameStatus, GameType } from "./general.types";

class Game {
    private socket: WebSocket | undefined;
    private status: Writable<GameStatus>;
    private chess: Writable<Chess>;
    private color: Writable<Color>;

    constructor() {
        this.socket = undefined;
        this.status = writable("INACTIVE");
        this.chess = writable(new Chess());
        this.color = writable("w");

        this.status.subscribe((status) => {
            if (status === "WAITING") console.log("waiting for another player to join");
            if (status === "ACTIVE") console.log("another player has joined, game has begun");
        }) 
    }

    connect(gameType: GameType, code?: string) {
        this.socket = new WebSocket(`ws://localhost:108/game/${gameType?.toLowerCase()}${code ? "/"+code : ""}`);

        this.socket.onopen = () => {
            this.listen();
        }
    }

    listen() {
        if (!this.socket) return;
        this.socket.onmessage = (event) => {
            if (event.data === "[game]: connected, waiting for another player to join") {
                this.status.set("WAITING");
            }

            if (event.data === "[game]: both players connected, game has begun") {
                this.status.set("ACTIVE");

                // making white move just for test
                setTimeout(() => {
                    console.log("sdfsd");
                    this.chess.update(chess => {
                        chess.move({from: "e2", to: "e4"});
                        return chess;
                    });
                }, 5000);
            }

            if (event.data === "[game]: you are assigned black. it's opp's turn") {
                this.color.set("b");
            }
        }
    }

    disconnect() {
        this.status.set("END");
        this.socket?.close();
    }

    get STATUS(): Readable<GameStatus> {
        return this.status;
    }

    get CHESS(): Readable<Chess> {
        return this.chess;
    }

    get COLOR(): Readable<Color> {
        return this.color;
    }
}

export default new Game(); 