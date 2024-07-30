import { IncomingMessage } from "http";
import WebSocket from "ws";

import Manager from "./lib/manager";

import { splitPath } from "./bin/helpers";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
    ws.on("error", console.error);
    console.log("[ws]: user connected");

    // this will always be true since path has already been validated before conn upgrade
    let path = req.url ? splitPath(req.url) : [];
    
    // path[2] can be undefined but path[1] will never be undefined for reason spec. above
    let message = manager.manage(ws, path[1], path[2]);
    if (message) console.log(message);

    ws.on("close", () => {
        console.log("[ws]: user disconnected");
    });
});

export default wss;