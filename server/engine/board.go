package engine

type Location struct {
	x uint8
	y uint8
}

type Block struct {
	loc Location
	piece [1]Piece
}

// isCapture, isCheck, isCastling, isPromotion
type Move struct {
	player uint8
	start Location
	end Location
}


type Board [8][8]Block

func setupBoard() Board {
	var board Board;
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			board[i][j] = Block{
				loc: Location{
					x: uint8(i),
					y: uint8(j),
				},
				piece: [1]Piece{},
			}
		}
	}
	return board
} 

func(b Board) movePiece(move Move) {
	b[move.end.x][move.end.y].piece[0] = b[move.start.x][move.start.y].piece[0] 
}

// getPiece, isCheck, ischeckmate, isstalemate,