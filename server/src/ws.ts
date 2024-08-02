import { IncomingMessage } from "http";
import WebSocket from "ws";

import Manager from "./lib/manager";

import { splitPath } from "./bin/helpers";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

// user will eventually be turned into a class user, will be created here 
// it will contain the socket, auth info (isloggedin, id, name etc)
// on game creation in manager, user will be promoted to player which will extend user
// on exit, instead of matching socket, id will be matched
wss.on("connection", (user: WebSocket, req: IncomingMessage) => {
    user.on("error", console.error);
    console.log("[ws]: user connected");

    // this will always be true since path has already been validated before conn upgrade
    let path = req.url ? splitPath(req.url) : [];
    
    // path[2] can be undefined but path[1] will never be undefined for reason spec. above
    let message = manager.enter(user, {type: path[1], code: path[2]});
    if (message) console.log("[ws]:", message);

    user.on("close", () => {
        let message = manager.exit(user);
        console.log("[ws]:", message ? message : "user disconnected.");
    });
});

export default wss;