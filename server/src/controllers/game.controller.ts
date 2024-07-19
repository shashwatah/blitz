import { Request, Response } from "express"

import { GameStatus } from "../types/general.enums";
import { Location } from "../types/general.interfaces";
import Game from "../engine/game";

function gameController(req: Request, res: Response) {
    let game = new Game("dedcliff", "guest_514");

    let startPos: Location = { x: 0, y: 1 };
    let endPos: Location = { x: 2, y: 2 };
    game.movePiece(startPos, endPos)

    res.send(`[game]: status: ${GameStatus[game.getStatus()].toLowerCase()}`);
}

export default gameController;