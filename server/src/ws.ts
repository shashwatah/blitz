import WebSocket from "ws";
import Manager from "./core/manager";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error);
    console.log("[ws]: player connected");

    manager.manage(ws);
    
    ws.on("close", () => {
        console.log("[ws]: client disconnected");
    })
});

export default wss;