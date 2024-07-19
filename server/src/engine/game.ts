// if () are not uniform
// == used instead of === in a lot of places
// nomenclature is already getting confusing
// move piece flow has revealed some flaws: 
//  - how does game controller relay what player made the move? 
//      - current turn?
//      - or should the player object be created outside the game class and also handled there? (websockets?)
//  - is player data being handled correctly? players are stored as playerOne and playerTwo in Game but are referenced
//    everywhere else as PlayerNum enum.
//  - if this player referencing system is fine & current turn is being used in the move, it needs to be verified whether the 
//    user who sent the moves in the ws connection is actually the player in current turn.
//      - need to find all areas i need to validate

// todo: pretty print chessboard.

import { Color, GameStatus, PlayerNum } from "../types/general.enums";
import { Location, Move } from "../types/general.interfaces"

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
        let [p1Color, p2Color] = this.rngColor();

        this.playerOne = new Player(p1Username, p1Color);
        this.playerTwo = new Player(p2Username, p2Color);
        this.chessboard = new Chessboard();
        this.status = GameStatus.Active;
        // this gives unwanted result right now, will be reverted later.
        // this.turn = p1Color == 0 ? PlayerNum.One : PlayerNum.Two;
        this.turn = 0;
    }

    private rngColor(): [Color, Color] {
        return Math.random() < 0.5 ? 
            [Color.White, Color.Black] : 
            [Color.Black, Color.White];
    }

    movePiece(startPos: Location, endPos: Location) {
        let move: Move = { startPos, endPos, player: this.turn }

        let movingPlayer = PlayerNum[move.player].toLowerCase();
        let nonMovingPlayer = PlayerNum[Math.abs(move.player - 1)].toLowerCase();

        let pieceData;

        try {
            pieceData = this.chessboard.move(move);
        } catch (error) {
            console.error(error);
        };

        console.log(`player ${movingPlayer}'s ${pieceData?.movedPieceName.toLowerCase()} moved.`);
        if (pieceData?.capturedPieceName !== undefined) {
            // add capturedPiece to player
            console.log(`player ${movingPlayer} captured player ${nonMovingPlayer}'s ${pieceData?.capturedPieceName?.toLowerCase()}.`);
        }

        this.turn = Math.abs(this.turn - 1);
    }

    getStatus() {
        return this.status;
    }

    printPlayers() {
        console.log(`player one: ${this.playerOne.json()}`);
        console.log(`player two: ${this.playerTwo.json()}`);
    }

    printChessboard() {
        this.chessboard.print();
    }   
}