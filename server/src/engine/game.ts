import { Color, GameStatus, PlayerNum } from "../types/general.enums";
import Player from "./player";
import Chess from "./chess";

export default class Game { 
    private playerOne: Player;
    private playerTwo: Player;
    private chess: Chess;
    private status: GameStatus;
    private turn: PlayerNum;
    // private moves: Array<Move>

    // colour will be random eventually.
    constructor(p1: string, p2: string) {
        this.playerOne = new Player(p1, Color.White);
        this.playerTwo = new Player(p2, Color.Black);
        this.chess = new Chess();
        this.status = GameStatus.Active;
        this.turn = PlayerNum.One;
    }

    printBoard() {
        this.chess.printBoard();
    }   
}