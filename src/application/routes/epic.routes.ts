import { Router } from "express";
import { EpicController } from "../controllers/EpicController";

const epicRouter = Router();
const epicController = new EpicController();

epicRouter.post("/epic", epicController.createEpic);
epicRouter.get("/epic", epicController.listEpics);
epicRouter.delete("/epic", epicController.deleteEpic);


export { epicRouter }