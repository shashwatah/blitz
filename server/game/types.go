package game

type Player struct {
	name string
	num PlayerNum
	color PlayerColor
	timer string
	capturedPieces []Piece
}

type Piece struct {
	player PlayerNum
	pieceType string
}

type BlockLocation struct {
	x uint8
	y uint8
}

type Block struct {
	loc BlockLocation
	piece [1]Piece
}

type Board [][]Block

type Move struct {
	playerNum PlayerNum
	moveStart BlockLocation
	moveEnd BlockLocation
}

type Game struct {
	playerOne Player
	playerTwo Player
	board Board
	turn PlayerNum
	status GameStatus
	moves []Move
}