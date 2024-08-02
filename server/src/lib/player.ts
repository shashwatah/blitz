import User from "./user";

import { PlayerColor, PlayerNum } from "../bin/types";

export default class Player extends User {
    private number: PlayerNum;
    private color: PlayerColor;
    private timer: string;
    private capPieces: [];

    constructor(user: User, number: PlayerNum, color: PlayerColor) {
        super(user);
        this.number = number;
        this.color = color;
        this.timer = "3:00";
        this.capPieces = [];
    }
    
    get NUM(): PlayerNum {
        return this.number
    }
}