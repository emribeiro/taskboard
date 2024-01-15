import { Router } from "express";
import { epicRouter } from "./epic.routes";

const router = Router();
router.use(epicRouter);

export { router }