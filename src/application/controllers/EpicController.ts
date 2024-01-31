import { Request, Response } from "express";
import { EpicUseCase } from "../../domain/usecases/EpicUseCase";
import { container } from "tsyringe";


class EpicController{

    async createEpic(request: Request, response: Response){

        const epicUseCase: EpicUseCase = container.resolve(EpicUseCase);
        const { name, description} = request.body;
        const epic = await epicUseCase.create(name, description);

        return response.status(201).send(epic);
        
    }

    async listEpics(request: Request, response: Response){

        const epicUseCase: EpicUseCase = container.resolve(EpicUseCase);
        const epics = await epicUseCase.list();

        return response.status(200).send(epics)

    }

    async deleteEpic(request: Request, response: Response){
        const epicId = request.params.epicId;
        const epicUseCase : EpicUseCase = container.resolve(EpicUseCase);

        await epicUseCase.delete(epicId);

        return response.status(200).send({message: "Épico deletado com sucesso!"});
        
        
    }

}

export { EpicController }