import { Color, ChessPiece } from "../types/general.enums";

export default class Player {
    private name: string;
    private color: Color;
    private timer: string;
    private capturedPieces: ChessPiece[];

    constructor(name: string, color: Color) {
        this.name = name;
        this.color = color;
        this.timer = "3:00";
        this.capturedPieces = []
    }
}