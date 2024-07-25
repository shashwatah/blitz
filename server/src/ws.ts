import WebSocket from "ws";

const wsServer: WebSocket.Server = new WebSocket.Server({ noServer: true }); 

wsServer.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error)

    console.log("[server] [ws]: client connected");

    ws.on("message", (msg) => {
        console.log(`[server] [ws] client: ${msg}`);
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(`hello from server`);
        }
    });

    ws.on("close", () => {
        console.log("[server] [ws]: client disconnected");
    })
});

export default wsServer;