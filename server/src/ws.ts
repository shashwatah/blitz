import { IncomingMessage } from "http";
import WebSocket from "ws";

import Manager from "./lib/manager";
import User from "./lib/user";

import { splitPath } from "./bin/helpers";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (socket: WebSocket, req: IncomingMessage) => {
    socket.on("error", console.error);
    console.log("[ws]: user connected");

    let user = new User({socket});
    // this will always be true since path has already been validated before conn upgrade
    let roomInfo = req.url ? splitPath(req.url) : [];
    
    // path[2] can be undefined but path[1] will never be undefined for reason spec. above
    let message = manager.manageEntry(user, {type: roomInfo[1], code: roomInfo[2]});
    if (message) console.log("[ws]:", message);

    socket.on("close", () => {
        let message = manager.manageExit(user);
        console.log("[ws]:", message ? message : "user disconnected");
    });
});

export default wss;