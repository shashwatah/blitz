import express from "express";
import http from "http";
import dotenv from "dotenv";

import router from "./router";
import wss from "./ws"

import { validateGamePath } from "./bin/helpers";

dotenv.config();

const port = process.env.PORT || 3000;

const exp: express.Express = express();
const server: http.Server = http.createServer(exp); 

exp.use(router);

server.on("upgrade", (req, socket, head) => { 
    if (validateGamePath(req.url)) {
        wss.handleUpgrade(req, socket, head, (ws) => {
            wss.emit("connection", ws, req);
        })
    } else {
        socket.destroy();
    }
});

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});