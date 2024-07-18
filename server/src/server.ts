import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";

dotenv.config();

const server: Express = express();
const port = process.env.PORT || 3000;

server.get("/", (req: Request, res: Response) => {
    console.log("[server] [root]: hit") 
    res.send("[root]: server is running");
});

server.listen(port, () => {
    console.log(`[server]: Server is running on port: ${port}`);
});