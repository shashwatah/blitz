enum PieceType {
    Rook = 0,
    Knight,
    Bishop,
    Queen, 
    King, 
    Pawn
}

interface Block {
    piece?: {
        player: number,
        type: PieceType
    } 
}

type Board = Block[][];

export default class Chess {
    private board: Board; 

    constructor() {
        this.board = [];
        this.setup();
    }

    private setup()  {
        for (let i = 0; i < 8; i++) {
            let arr: Block[] = [];
            for (let i = 0; i < 8; i++) {
                arr.push({});
            }
            this.board.push(arr);
        }

        this.populate(0);
        this.populate(1);
    }

    private populate(player: number) {
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

    printBoard() {
        console.log(JSON.stringify(this.board, null, 2));
    }
}