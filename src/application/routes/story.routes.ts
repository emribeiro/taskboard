import { Router } from "express";
import { StoryController } from "../controllers/StoryController";


const storyRouter = Router();
const storyController: StoryController = new StoryController();

storyRouter.post("/", storyController.create);

export { storyRouter }