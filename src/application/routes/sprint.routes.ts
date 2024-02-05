import { Router } from "express";
import { SprintController } from "../controllers/SprintController";

const sprintRouter = Router();
const controller = new SprintController();

sprintRouter.post("/", controller.create);
sprintRouter.get("/", controller.list);


export { sprintRouter }