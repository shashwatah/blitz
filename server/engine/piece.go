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
	kind PieceType 
}

func(p Piece) isValidMove(_ Move) bool { return true }

func(p Piece) getValidMoves() []Move { return []Move{} }

// king: inCheck, inCheckmate, castling
// rook: canCastle,
// pawn: canPromote, promote
