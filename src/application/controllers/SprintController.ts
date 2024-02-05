import { Request, Response } from "express";
import { SprintUseCase } from "../../domain/usecases/SprintUseCase";
import { container } from "tsyringe";

class SprintController{

    async create(request: Request, response: Response){
        const sprintUseCase: SprintUseCase = container.resolve(SprintUseCase);
        const {name, startDate, dueDate } = request.body;

        const sprint = await sprintUseCase.create(name, startDate, dueDate);

        return response.status(201).send(sprint);

    }

    async list(request: Request, response: Response){
        const sprintUseCase: SprintUseCase = container.resolve(SprintUseCase);

        const sprints = await sprintUseCase.list();

        return response.status(200).send(sprints);
    }

}

export { SprintController }