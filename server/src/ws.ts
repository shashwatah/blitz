import WebSocket from "ws";
import Game from "./lib/game";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let games: Game[] = []; 
let waiting: WebSocket | undefined;

wss.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error)

    if (!waiting) {
        waiting = ws;
        console.log("[ws]: player connected, waiting for another player to join")
        return;
    }

    let game = new Game(waiting, ws);
    console.log(`[ws]: player connected, game status: ${game.getStatus().toLowerCase()}`);

    games.push(game);
    console.log(`[ws]: active games: ${games.length}`)
    
    waiting = undefined;
    
    ws.on("close", () => {
        console.log("[ws]: client disconnected");
    })
});

export default wss;