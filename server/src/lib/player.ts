import WebSocket from "ws";
import { PlayerColor, ChessPiece } from "./types";

export default class Player {
    private ws: WebSocket;
    private color: PlayerColor;
    private timer: string;
    private capturedPieces: ChessPiece[];

    constructor(ws: WebSocket, color: PlayerColor) {
        this.ws = ws;
        this.color = color;
        this.timer = "3:00";
        this.capturedPieces = []

        this.listen();
    }

    private listen() {
        this.ws.on("message", (msg) => {
            console.log(`[server] [ws] client: ${msg}`);
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(`hello from server`);
            }
        });
    }
}