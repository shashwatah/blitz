import { Color } from "chess.js";
import User from "./user";

export default class Player extends User {
    private color: Color;
    private timer: string;
    private capPieces: [];

    constructor(user: User, color: Color) {
        super(user);
        this.color = color;
        this.timer = "3:00";
        this.capPieces = [];
    }
    
    get COLOR(): Color {
        return this.color;
    }
}