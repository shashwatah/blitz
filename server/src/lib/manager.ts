import WebSocket from "ws";

import Game from "./game"

import { CREATE_GAME, JOIN_GAME } from "../bin/messages";

export default class Manager {
    private games: Game[];
    private waiting: WebSocket | undefined;
    
    constructor() {
        this.games = [];
        this.waiting = undefined;
    }

    manage(ws: WebSocket) {
        ws.on("message", (data: WebSocket.RawData) => {
            // let data = event.data;
            let message;
            try {
                message = JSON.parse(data.toString());
            } catch (err) {
                ws.send("[server] [ws]: invalid message: json error")
                return;
            }

            if (this.waiting === ws) {
                ws.send("[server] [ws]: already waiting for a game");
                return;
            }
            
            // CREATE GAME
            if (message.type === CREATE_GAME) {
                ws.send("[server] [ws]: wip");
                return;
            }

            // JOIN GAME
            // message: {"type": "join_game"} 
            if (message.type === JOIN_GAME) {
                if (!this.waiting) {
                    this.waiting = ws;
                    ws.send("[game]: connected, waiting for another player to join.");
                    return;
                }
        
                // "user"s will be elevated to "player"s in Game, this listener will be dropped for a new one. 
                let game = new Game(this.waiting, ws);
                this.games.push(game);
                this.waiting = undefined;

                // console logs should ideally be in top level files (ws in this case)
                console.log(`[ws]: game created; active games: ${this.getActiveGames()}`) 
                
                return;
            }

            // handle match abandonment

            ws.send("[server] [ws]: invalid message");
        });
    }

    getActiveGames(): number {
        return this.games.length
    }
}