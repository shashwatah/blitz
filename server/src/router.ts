import { Router, Request, Response } from "express";
import gameController from "./controllers/game.controller"; 

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("[server] [root]: hit") 
    res.send("[root]: server is running");
});

router.get("/game", gameController);

export default router;
