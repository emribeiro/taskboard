import { Router } from "express";
import { SprintController } from "../controllers/SprintController";

const sprintRouter = Router();
const controller = new SprintController();

sprintRouter.post("/", controller.create);
sprintRouter.get("/", controller.list);
sprintRouter.get("/active", controller.getActive);
sprintRouter.put("/:sprintId/finish", controller.finishSprint);
sprintRouter.post("/:sprintId/addStories", controller.addStories);


export { sprintRouter }