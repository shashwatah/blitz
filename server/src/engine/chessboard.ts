import { ChessPiece, PlayerNum } from "../types/general.enums";

interface Chessblock {
    piece?: {
        player: PlayerNum,
        type: ChessPiece
    } 
}

export default class Chessboard {
    private board: Chessblock[][]; 

    constructor() {
        this.board = [];
        this.setup();
    }

    private setup()  {
        for (let i = 0; i < 8; i++) {
            let arr: Chessblock[] = [];
            for (let i = 0; i < 8; i++) {
                arr.push({});
            }
            this.board.push(arr);
        }

        this.populate(PlayerNum.One);
        this.populate(PlayerNum.Two);
    }

    private populate(player: PlayerNum) {
        let pieces = [0, 1, 2, 3, 4, 2, 1, 0]

        let r1 = 7 * player;
        let r2 = Math.abs((7 * player) - 1);

        for(let i = 0; i < 8; i++) {
            this.board[r1][i].piece = {
                player,
                type: pieces[i]
            }
        }
        
        for(let i = 0; i < 8; i++) {
            this.board[r2][i].piece = {
                player,
                type: 5
            }
        }
    }

    print() {
        console.log(JSON.stringify(this.board, null, 2));
    }
}