import WebSocket from "ws";
import { PlayerColor, ChessPiece, PlayerNum } from "./types";


export default class Player {
    private socket: WebSocket;
    private number: PlayerNum;
    private color: PlayerColor;
    private timer: string;
    private capturedPieces: ChessPiece[];

    constructor(socket: WebSocket, number: PlayerNum, color: PlayerColor) {
        this.socket = socket;
        this.number = number;
        this.color = color;
        this.timer = "3:00";
        this.capturedPieces = []
    }

    listen(listener: (data: WebSocket.RawData) => void) {
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