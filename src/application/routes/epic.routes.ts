import { Router } from "express";
import { EpicController } from "../controllers/EpicController";

const epicRouter = Router();
const epicController = new EpicController();

epicRouter.post("/", epicController.createEpic);
epicRouter.get("/", epicController.listEpics);
epicRouter.delete("/", epicController.deleteEpic);


export { epicRouter }