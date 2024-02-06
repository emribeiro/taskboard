import { Router } from "express";
import { StoryController } from "../controllers/StoryController";


const storyRouter = Router();
const storyController: StoryController = new StoryController();

storyRouter.post("/", storyController.create);
storyRouter.get("/", storyController.listAll);
storyRouter.post("/:storyId/addtasks",storyController.addTasks);

export { storyRouter }