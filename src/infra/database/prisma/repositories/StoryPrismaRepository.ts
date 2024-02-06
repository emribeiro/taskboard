import { PrismaClient } from "@prisma/client";
import { StoryRepository } from "../../../../domain/repositories/StoryRepository";
import { Story } from "../../../../domain/entities/Story";
import { StoryType } from "../../../../domain/entities/StoryType";
import { StoryStatus } from "../../../../domain/entities/StoryStatus";
import { StoryMapper } from "../mappers/StoryMapper";



class StoryPrismaRepository implements StoryRepository{
    private client: PrismaClient;

    constructor(){
        this.client = new PrismaClient();
    }


    async create(title: string, type: number, points: number, acceptanceCriteria?: string | undefined, epicId?: string | undefined): Promise<Story> {
        const story = await this.client.story.create({
            data: {
                title,
                type,
                points,
                acceptanceCriteria,
                epicId
            },
            include: {
                storyType: true
            }
        });


        return StoryMapper.toDomain(story);
    }

    async listAll(): Promise<Story[]> {
        const stories = await this.client.story.findMany({ include: { storyType: true}});
        
        const mappedStories = stories.map( (story): Story => {
            return StoryMapper.toDomain(story)
        });

        return mappedStories;
    }
    
}

export { StoryPrismaRepository }