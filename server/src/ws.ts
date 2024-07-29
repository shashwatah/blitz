import WebSocket from "ws";
import Manager from "./core/manager";
import Game from "./core/game";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error);
    
    let turn = manager.manage(ws);
    
    if (!turn) {
        console.log("[ws]: player connected, waiting for another player to join");
        return;
    }

    console.log(`[ws]: another player connected, game created; current turn: ${turn}`);
    console.log(`[ws]: active games: ${manager.getGamesNum()}`)
    
    ws.on("close", () => {
        console.log("[ws]: client disconnected");
    })
});

export default wss;