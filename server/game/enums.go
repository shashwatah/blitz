package game

type PlayerNum int
const (
	One PlayerNum = iota+1
	Two
)

type PlayerColor int
const (
	White PlayerColor = iota+1
	Black
)

type PieceType int 
const (
	King PieceType = iota+1
	Queen
	Rook
	Knight
	Bishop
	Pawn
)

type GameStatus int 
const (
	Active GameStatus = iota+1
	OneWin
	TwoWin
	StaleMate
)