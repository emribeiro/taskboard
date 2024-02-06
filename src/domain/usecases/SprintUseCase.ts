import { inject, injectable } from "tsyringe";
import { SprintRepository } from "../repositories/SprintRepository";
import { Sprint } from "../entities/Sprint";

@injectable()
class SprintUseCase{
    constructor(
        @inject('SprintRepository')
        private repository: SprintRepository
    ){}


    async create(name: string, startDate: string, dueDate: string): Promise<Sprint>{
        
        if(!name || name.trim().length == 0 ) throw new Error("Mandatory Data not Informed: name");

        const startD = new Date(startDate);
        const dueD = new Date(dueDate);

        if(dueD <  startD) throw new Error("Due Date Before Start Date!!");
        
        const activeSprint = await this.repository.getActive();

        if(activeSprint) throw new Error("Already have a active Sprint!");
        
        const sprint = await this.repository.create(name, startD, dueD);

        return sprint;
    }

    async list(): Promise<Sprint[]>{
        const sprints = await this.repository.list();

        return sprints;
    }

    async getActive(): Promise<Sprint | null >{
        const activeSprint = await this.repository.getActive();

        return activeSprint;
    }

    async finishSprint(sprintId: string): Promise<void>{
        const sprint = await this.repository.getById(sprintId);

        if(sprint.status == 2) throw new Error("Sprint already finished!");

        await this.repository.finishStory(sprintId);
    }

    async addStories(sprintId: string, stories: string[]): Promise<void>{
        await this.repository.addStories(sprintId, stories);
    }
}

export { SprintUseCase }