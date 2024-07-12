package engine

type status int 
const (
	active status = iota+1
	onewin
	twowin
	stalemate
)

type Game struct {
	players [2]player
	board board
	turn uint8
	status status
	moves []move
}

func InitGame(players [2]string) Game {
	pOne := player{
		name: players[0],
		color: white,
		timer: "3:00",
		capturedPieces: []piece{},
	} 

	pTwo := player{
		name: players[1],
		color: black,
		timer: "3:00",
		capturedPieces: []piece{},
	}

	b := setupBoard();
	
	g := Game{
		players: [2]player{pOne, pTwo},
		board: b,
		turn: 0,
		status: active,
		moves: []move{},
	}

	return g;
}

func (g Game) GetStatus() int {
	return int(g.status)
}