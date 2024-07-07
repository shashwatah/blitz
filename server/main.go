package main

import (
	"fmt"
	"log"
	"net/http"
)

func handleRoot(res http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(res, "root: server is running")
}

func setupRoutes() {
	http.HandleFunc("/", handleRoot)
}

func main() {
	var port uint8 = 108;
	setupRoutes()
	fmt.Printf("Server is running on port %d \n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}