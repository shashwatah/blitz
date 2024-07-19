import { Color, GameStatus, PlayerNum } from "../types/general.enums";
import Player from "./player";
import Chessboard from "./chessboard";

export default class Game { 
    private playerOne: Player;
    private playerTwo: Player;
    private chessboard: Chessboard;
    private status: GameStatus;
    private turn: PlayerNum;
    // private moves: Array<Move>

    constructor(p1Username: string, p2Username: string) {
        let [p1Color, p2Color] = this.decideColor();

        this.playerOne = new Player(p1Username, p1Color);
        this.playerTwo = new Player(p2Username, p2Color);
        this.chessboard = new Chessboard();
        this.status = GameStatus.Active;
        this.turn = p1Color == 0 ? PlayerNum.One : PlayerNum.Two;
    }

    decideColor(): [Color, Color] {
        return Math.random() < 0.5 ? 
            [Color.White, Color.Black] : 
            [Color.Black, Color.White];
    }

    printPlayers() {
        console.log("player one:", this.playerOne.json());
        console.log("player two:", this.playerTwo.json());
    }

    printChessboard() {
        this.chessboard.print();
    }   
}