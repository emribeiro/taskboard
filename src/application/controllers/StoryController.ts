import { Request, Response } from "express";
import { StoryUseCase } from "../../domain/usecases/StoryUseCase";
import { container } from "tsyringe";
import { CreateStoryDTO } from "../dtos/CreateStoryDTO";
import { STATUS_CODES } from "http";

class StoryController{

    async create(request: Request, response: Response){
        const storyUseCase: StoryUseCase = container.resolve(StoryUseCase);
        const {title, type, points, acceptanceCriteria, epicId}: CreateStoryDTO = request.body;

        const story = await storyUseCase.create( title
                                         , type
                                         , points
                                         , acceptanceCriteria
                                         , epicId);

        return response.status(201).send(story);
    }

}

export { StoryController }