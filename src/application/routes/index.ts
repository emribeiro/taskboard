import { Router } from "express";
import { epicRouter } from "./epic.routes";
import { storyRouter } from "./story.routes";

const router = Router();
router.use(epicRouter);
router.use("/story", storyRouter);

export { router }