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

    async getActive(request: Request, response: Response){
        const sprintUseCase: SprintUseCase = container.resolve(SprintUseCase);

        const activeSprint = await sprintUseCase.getActive();

        if(activeSprint == null){
            return response.status(204).send();
        }else{
            return response.status(200).send(activeSprint);
        }
    }

    async finishSprint(request: Request, response: Response){
        const sprintUseCase: SprintUseCase = container.resolve(SprintUseCase);
        const sprintId = request.params.sprintId;

        await sprintUseCase.finishSprint(sprintId);

        return response.status(200).send();
    }

}

export { SprintController }