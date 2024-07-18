import Chess from "./chess";

enum GameStatus {
    Active,
    OneWin,
    TwoWin,
    Stalemate
}

export default class Game {
    private players: string[];
    private chess: Chess;
    private status: GameStatus;
    private turn: number;
    // private moves: Array<Move>

    constructor(players: Array<string>) {
        this.players = players;
        this.chess = new Chess();
        this.status = GameStatus.Active;
        this.turn = 1;
    }

    printBoard() {
        this.chess.printBoard();
    }   
}