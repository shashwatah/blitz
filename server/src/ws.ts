import WebSocket from "ws";
import Game from "./lib/game";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let games: Game[] = []; 
let waiting: WebSocket | undefined;

wss.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error)

    if (waiting === undefined) {
        waiting = ws;
        console.log("[ws]: player one connected, waiting for player two")
        return;
    }

    let game = new Game(waiting, ws);
    console.log(`[ws]: player two connected, game status: ${game.getStatus().toLowerCase()}`);

    games.push(game);
    console.log(`[ws]: active games = ${games}`)
    
    waiting = undefined;
    
    ws.on("close", () => {
        console.log("[server] [ws]: client disconnected");
    })
});

export default wss;