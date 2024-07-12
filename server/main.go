package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/shashwatah/blitz/server/engine"
)

func handleRoot(res http.ResponseWriter, req *http.Request) {
	fmt.Fprint(res, "root: server is running")
}

func handleGame(res http.ResponseWriter, req *http.Request) {
	game := engine.InitGame([2]string{"shashwatah", "guest_514"});
	status := game.GetStatus()

	if (status != 1) {
		fmt.Fprint(res, "game: error")
	}
	
	fmt.Fprint(res, "game: game created; status: active")
}

func setupRoutes() {
	http.HandleFunc("/", handleRoot)
	http.HandleFunc("/game", handleGame)
}

func main() {
	var port uint8 = 108;
	setupRoutes()
	fmt.Printf("Server is running on port %d \n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}