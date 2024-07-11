package engine 

type GameStatus int 
const (
	Active GameStatus = iota+1
	OneWin
	TwoWin
	StaleMate
)

type Game struct {
	players [2]Player
	board Board
	turn uint8
	status GameStatus
	moves []Move
}