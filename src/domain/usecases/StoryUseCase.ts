import { inject, injectable } from "tsyringe";
import { StoryRepository } from "../repositories/StoryRepository";

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
                    }else{
                        const storyType = await this.repository.getStoryType(type);

                        if(!storyType) throw new Error("StoryType not found: " + type);
                    }

                    const story = await this.repository.create( title 
                                                              , type
                                                              , points
                                                              , acceptanceCriteria
                                                              , epicId);

                    return story;
                }
}

export { StoryUseCase }