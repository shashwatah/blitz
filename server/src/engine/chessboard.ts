import { ChessPiece, PlayerNum } from "../types/general.enums";
import { Location, Move } from "../types/general.interfaces";

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

    move(move: Move): {movedPieceName: string, capturedPieceName: string | undefined} {
        let capturedPieceName: string | undefined;

        let startPosPiece = this.getPieceAt(move.startPos);
        let endPosPiece = this.getPieceAt(move.endPos); 

        if (startPosPiece === undefined) {
            throw new Error("move error: no piece exists at start position.");
        }

        if (startPosPiece.player !== move.player) {
            throw new Error("move error: the piece at start pos does not belong to player");
        }

        if (endPosPiece !== undefined) {
            if (endPosPiece.player === move.player) {
                throw new Error("[move] [error]: a piece belonging to the player already exists at end position.")
            } else {
                capturedPieceName = ChessPiece[endPosPiece.type];
            }
        }

        this.board[move.endPos.x][move.endPos.y] = this.board[move.startPos.x][move.startPos.y];
        this.board[move.startPos.x][move.startPos.y] = {};
        
        return {
            movedPieceName: ChessPiece[startPosPiece.type],
            capturedPieceName
        }
    }

    getPieceAt(pos: Location): { player: PlayerNum, type: ChessPiece } | undefined {
        return this.board[pos.x][pos.y].piece
    }

    print() {
        console.log(JSON.stringify(this.board, null, 2));
    }
}