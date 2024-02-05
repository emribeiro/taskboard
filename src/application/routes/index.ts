import { Router } from "express";
import { epicRouter } from "./epic.routes";
import { storyRouter } from "./story.routes";
import { sprintRouter } from "./sprint.routes";

const router = Router();
router.use("/", epicRouter);
router.use("/story", storyRouter);
router.use("/sprint", sprintRouter);

export { router }