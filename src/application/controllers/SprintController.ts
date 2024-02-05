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

}

export { SprintController }