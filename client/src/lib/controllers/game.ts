// todo:
//      possible moves highlight, only allow valid moves on client
//      special moves: capturing, castelling, en passe, etc
//          dropping a piece on a block with another piece doesn't detect the drop
//      proper validation and syncing of moves
//      timer, move history, modals & msgs
//      make draggin piece exist above other pieces 
//          (black pieces go under white ones rn)
//      handle other buttons on game page (home & acc)
//          clicking logo takes you to home but doesn't dsc socket
//      there's more area to click on a piece than required

import { writable, type Writable, type Readable } from "svelte/store";

import { Chess, type Color } from "chess.js";

import type { GameStatus, GameType } from "../types/general";
import { WAIT, INIT, OPPMV, YOUMV, ERROR, WARN, END } from "../utils/messages";
import { BADCODE, BADMOVE, OPPDSC, OPPRSG, YOURSG } from "../utils/messages";
import { MOVE, RESIGN } from "../utils/messages";

// much better than before, not bad at all
// but still needs a few updates
class Game {
    private id: string | undefined = undefined;
    private socket: WebSocket | undefined = undefined;

    // will change these two members later (maybe a game data object?)
    // also the name color feels wrong since it's just the player's color
    private code: string | undefined = undefined;
    private color: Color | undefined = undefined;

    // should chess not be a store?
    // could manage the game flow with a "moved" status or something 
    // this is because i will eventually need to get valid moves after every turn
    // this could also do away with the need to decide turn in /game
    // might not go throught with this though
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
        });
    }

    private reset() {
        this.id = undefined;
        this.socket = undefined;
        this.code = undefined;
        this.color = undefined
        this.status.set("INACTIVE");
        this.chess.set(new Chess());
    }

    private listen() {
        if (!this.socket) return;

        // badmv, oppmv and youmv work but are rudimentary
        // need to iron out the message flow
        this.socket.onmessage = (event) => {
            let message = JSON.parse(event.data);

            if (message.type === ERROR) {
                if (message.error === BADCODE) {
                    console.log("[server]: bad game code");
                    this.status.set("CONNFAIL");
                }
            }

            if (message.type === WARN) {
                if (message.cause === BADMOVE) {
                    this.chess.update((chess) => {
                        chess.undo();
                        return chess;
                    });
                    console.log("[server]: invalid move");
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
            }

            if (message.type === OPPMV) {
                this.chess.update(chess => {
                    // what if the user has tampered with the client
                    // incoming move might not be valid here
                    chess.move(message.move);
                    return chess;
                });
                console.log("[server]: opp moved", message.move);
            }

            if (message.type === YOUMV) {
                console.log("[server]: you moved", message.move);
            }

            if (message.type === END) {
                if (message.cause === OPPDSC) console.log("[server]: opp has disconnected");
                if (message.cause === OPPRSG) console.log("[server]: opp has resigned");
                if (message.cause === YOURSG) console.log("[server]: you have resigned");

                this.status.set("END");
            }
        }
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

    move(move: {from: string, to: string}) {
        // this is a rudimentary move method, this works as of now
        // this whole process needs to follow the flow ive created
        // also, this needs to be made tamper proof (as far as i possibly can)
        // this will also involve client (chessboard.svelte) validation
        this.chess.update((chess) => {
            try {
                chess.move(move);
            } catch (err) {
                console.log("[client]: invalid move");
                return chess;
            }

            this.socket?.send(JSON.stringify({type: MOVE, move: move}));

            return chess;
        })
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