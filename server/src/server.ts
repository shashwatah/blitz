import express from "express";
import http from "http";
import dotenv from "dotenv";

import router from "./router";
import wss from "./ws"

dotenv.config();

const port = process.env.PORT || 3000;

const exp: express.Express = express();
const server: http.Server = http.createServer(exp); 

exp.use(router);

// this code is taken from chatgpt and then modified to fit 
// ill add small explainers for now.
server.on("upgrade", (req, sock, head) => { 
    // server.on handles events that are sent to httpserver, in this case, upgrade
    // upgrade sends the request (req), underlying tcp connection (sock), and a buffer of inital data (?) (head)
    if (req.url === "/game") {
        // if the request is sent at the /game endpoint
        // the args will be passed on to the handleupgrade func in web socket server. 
        // currently the game endpoint also serves the gamecontroller, that will be changed later obviously.
        wss.handleUpgrade(req, sock, head, (ws) => {
            wss.emit("connection", ws, req);
        })
    } else {
        // if not, the socket connection gets closed.
        sock.destroy();
    }
});

server.listen(port, () => {
    console.log(`[server] [http]: Server is running on port: ${port}`);
});