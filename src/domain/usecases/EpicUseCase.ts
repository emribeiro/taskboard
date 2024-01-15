import { inject, injectable } from "tsyringe";
import { Epic } from "../entities/Epic";
import { EpicRepository } from "../repositories/EpicRepository"

@injectable()
class EpicUseCase{

    constructor(
        @inject('EpicRepository')
        private repository: EpicRepository
    )
    {}

    async create(name: string, description: string): Promise<Epic>{
        if(name.trim().length == 0) throw new Error("Campo Obrigaório não informado!");
        if(description.trim().length == 0) throw new Error("Campo Obrigatório não informado");

        const epic = await this.repository.create(name, description);

        return epic;
    }

    async list(): Promise<Epic[]>{
        return await this.repository.list();
    }

}

export { EpicUseCase }