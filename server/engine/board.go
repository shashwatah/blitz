package engine

type Location struct {
	x uint8
	y uint8
}

type Block struct {
	loc Location
	piece [1]Piece
}

type Board [][]Block

type Move struct {
	player uint8
	start Location
	end Location
}