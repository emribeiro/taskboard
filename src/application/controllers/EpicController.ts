import { Request, Response } from "express";
import { EpicUseCase } from "../../domain/usecases/EpicUseCase";
import { container } from "tsyringe";


class EpicController{

    async createEpic(request: Request, response: Response){

        const epicUseCase: EpicUseCase = container.resolve(EpicUseCase);

        const { name, description} = request.body;

        const epic = await epicUseCase.create(name, description);

        console.log(epic);

        return response.status(201).send(epic);
        
    }

}

export { EpicController }