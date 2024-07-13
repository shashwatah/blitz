package engine

type ptype int 
const (
	rook ptype = iota+1
	knight
	bishop
	queen
	king
	pawn
)

type piece struct {
	player uint8
	ptype ptype 
}

// func(p piece) isValidMove(_ move) bool { return true }

// func(p piece) getValidMoves() []move { return []move{} }

// king: inCheck, inCheckmate, castling
// rook: canCastle,
// pawn: canPromote, promote
