import { Color, ChessPiece } from "../types/general.enums";

export default class Player {
    private username: string;
    private color: Color;
    private timer: string;
    private capturedPieces: ChessPiece[];

    constructor(name: string, color: Color) {
        this.username = name;
        this.color = color;
        this.timer = "3:00";
        this.capturedPieces = []
    }

    json(): string {
        return JSON.stringify({username: this.username, color: Color[this.color]});
    }
}