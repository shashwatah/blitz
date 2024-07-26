import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    console.log("[root]: hit") 
    res.send("[root]: server is running");
});

router.get("/auth", (req: Request, res: Response) => {
    console.log("[auth]: hit");
    res.send("[auth]: wip");
})

export default router;