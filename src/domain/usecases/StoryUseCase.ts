import { inject, injectable } from "tsyringe";
import { StoryRepository } from "../repositories/StoryRepository";
import { Story } from "../entities/Story";

@injectable()
class StoryUseCase{

    constructor(
        @inject('StoryRepository')
        private repository: StoryRepository
    ){}

    async create( title: string
                , type: number
                , points: number
                , acceptanceCriteria?: string
                , epicId?: string){

                    if(!title || title.trim().length == 0) throw new Error("Mandatory data not informed: Title");

                    if(!type || type == 0) {
                        throw new Error("Mandatory data not informed: Type");
                    }

                    const story = await this.repository.create( title 
                                                              , type
                                                              , points
                                                              , acceptanceCriteria
                                                              , epicId);

                    return story;
                }

    async listAll(): Promise<Story[]>{
        const stories = await this.repository.listAll();

        return stories;
    }

    async addTasks(storyId: string, tasks: string[]): Promise<Story>{
        if(!storyId || storyId.trim().length == 0) throw new Error("Mandatory data not informed: storyId");

        if(!tasks || tasks.length == 0) throw new Error("Must be informed a least one task!");

        const story = await this.repository.addTasks(storyId, tasks);

        return story;
    }

}

export { StoryUseCase }