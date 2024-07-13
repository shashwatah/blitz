package engine

type player struct {
	name string
	color color
	timer string
	capturedPieces []piece 
}

func createPlayer(n string, c color) player {
	return player{
		name: n,
		color: c,
		timer: "3:00",
		capturedPieces: []piece{},
	}
}