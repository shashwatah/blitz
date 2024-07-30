import { IncomingMessage } from "http";
import WebSocket from "ws";

import Manager from "./lib/manager";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    ws.on("error", console.error);
    console.log("[ws]: user connected");

    manager.manage(ws);
    
    ws.on("close", () => {
        console.log("[ws]: user disconnected");
    });
});

export default wss;