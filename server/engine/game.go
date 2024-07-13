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

func InitGame(p [2]string) Game {
	p1 := initPlayer(p[0], white)
	p2 := initPlayer(p[1], black)

	b := setupBoard()
	b.print()
	
	g := Game{
		players: [2]player{p1, p2},
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


// getters, movepiece, abort, resign, draw    
// game loop? timer?