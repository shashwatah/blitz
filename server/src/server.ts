import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";

import router from "./router";

dotenv.config();

const port = process.env.PORT || 3000;
const server: Express = express();

server.use(router);

server.listen(port, () => {
    console.log(`[server]: Server is running on port: ${port}`);
});