package engine

type location struct {
	x uint8
	y uint8
}

type block struct {
	loc location
	piece [1]piece
}

// isCapture, isCheck, isCastling, isPromotion
type move struct {
	player uint8
	start location
	end location
}

type board [8][8]block

func setupBoard() board {
	var b board;
	for i := 0; i < 8; i++ {
		for j := 0; j < 8; j++ {
			b[i][j] = block{
				loc: location{
					x: uint8(i),
					y: uint8(j),
				},
				piece: [1]piece{},
			}
		}
	}
	return b
} 

func(b board) movePiece(m move) {
	b[m.end.x][m.end.y].piece[0] = b[m.start.x][m.start.y].piece[0] 
}

// getPiece, isCheck, ischeckmate, isstalemate,