package engine

type PieceType int 
const (
	King PieceType = iota+1
	Queen
	Rook
	Knight
	Bishop
	Pawn
)

type Piece struct {
	player uint8
	pieceType string
}