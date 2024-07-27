import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("[http] [root]: hit") 
    res.send("[server] [http] [root]: server is running");
});

router.get("/auth", (req: Request, res: Response) => {
    console.log("[http] [auth]: hit");
    res.send("[server] [http] [auth]: wip");
})

export default router;