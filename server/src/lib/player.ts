import WebSocket from "ws";

import { PlayerColor, PlayerNum } from "../bin/types";

export default class Player {
    private socket: WebSocket;
    private number: PlayerNum; // will be replaced with playerid later. 
    private color: PlayerColor;
    private timer: string;
    private capturedPieces: []; // use 'PieceSymbol' from chess.js

    constructor(socket: WebSocket, number: PlayerNum, color: PlayerColor) {
        this.socket = socket;
        this.number = number;
        this.color = color;
        this.timer = "3:00";
        this.capturedPieces = []
    }

    listen(listener: (data: WebSocket.RawData) => void) {
        // removing the listener for "message" created in manager 
        // this prevents the player from sending messages that are not supposed to be sent during a game (like join_game)
        // im not sure if this is the best way to do this, but it works for now as a quick fix.
        this.socket.removeAllListeners("message");
        this.socket.on("message", listener);
    }

    tell(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        }
    }

    getNumber(): PlayerNum {
        return this.number;
    }
}