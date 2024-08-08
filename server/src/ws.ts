import { IncomingMessage } from "http";
import WebSocket from "ws";

import Manager from "./lib/manager";
import User from "./lib/user";

import { splitPath } from "./utils/helpers";

const wss: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

let manager = new Manager();

wss.on("connection", (socket: WebSocket, req: IncomingMessage) => {
    socket.on("error", console.error);
    console.log("[ws]: user connected");

    let user = new User({socket});
    // this will always be true since path has already been validated before conn upgrade
    let reqGame = req.url ? splitPath(req.url) : [];
    
    // path[2] can be undefined but path[1] will never be undefined for reason spec. above
    let gameStart = manager.manageEntry(user, {type: reqGame[1], code: reqGame[2]});
    if (gameStart) console.log(`[ws]: game started; active games: ${manager.GAMES}`);

    socket.on("close", () => {
        let gameEnd = manager.manageExit(user);
        console.log("[ws]: user disconnected");
        if (gameEnd) console.log(`[ws]: game ended; active games: ${manager.GAMES}`);
    });
});

export default wss;