package engine

import (
	"fmt"
	"math"
)

type location struct {
	x uint8
	y uint8
}

type block struct {
	loc   location
	piece [1]piece
}

// isCapture, isCheck, isCastling, isPromotion
type move struct {
	player uint8
	start  location
	end    location
}

type board [8][8]block

func setupBoard() board {
	var b board = [8][8]block{}

	b.init()
	b.populate(0)
	b.populate(1)

	return b
}

func (b *board) init() {
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
}

func (b *board) populate(p int) {
	a := [8]ptype{rook, knight, bishop, queen, king, bishop, knight, rook}

	r1 := 7 * p
	r2 := int(math.Abs(float64((7 * p) - 1)))

	for i := 0; i < 8; i++ {
		b[r1][i].piece[0] = piece{
			player: uint8(p),
			ptype:  a[i],
		}
	}

	for i := 0; i < 8; i++ {
		b[r2][i].piece[0] = piece{
			player: uint8(p),
			ptype:  pawn,
		}
	}
}

func (b board) print() {
	for r := 0; r < 8; r++ {
		for c := 0; c < 8; c++{
			fmt.Print(b[r][c], " ")
		}
		fmt.Print("\n")
	} 
}

// func(b board) movePiece(m move) {
// 	b[m.end.x][m.end.y].piece[0] = b[m.start.x][m.start.y].piece[0]
// }

// getPiece, isCheck, ischeckmate, isstalemate,