import { Color } from "chess.js";
import User from "./user";

export default class Player extends User {
    private color: Color;
    public remTime: number;
    // private capPieces: [];

    constructor(user: User, color: Color) {
        super(user);
        this.color = color;
        // this.remTime = 3 * 60 * 1000;
        this.remTime = 30 * 1000;
        // this.capPieces = [];
    }

    get COLOR(): Color {
        return this.color;
    }
}