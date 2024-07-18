import { Request, Response } from "express"
import Game from "../engine/game";

function gameController(req: Request, res: Response) {
    let game = new Game("dedcliff", "guest_514");
    game.printBoard();
    
    res.send(`[game]: board ready.`);
}

export default gameController;