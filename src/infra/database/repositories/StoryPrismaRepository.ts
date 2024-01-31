import { PrismaClient } from "@prisma/client";
import { StoryRepository } from "../../../domain/repositories/StoryRepository";
import { Story } from "../../../domain/entities/Story";
import { StoryType } from "../../../domain/entities/StoryType";



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
            }
        });

        const storyType = await this.getStoryType(story.type);

        return {
            id: story.id,
            title: story.title,
            type: {
                code: storyType.type,
                description: storyType.description
            },
            points: story.points,
            acceptanceCriteria: story.acceptanceCriteria == null ? undefined : story.acceptanceCriteria,
            epicId: story.epicId == null ? undefined : story.epicId

        }
    }

    async getStoryType(type: number): Promise<StoryType> {
        const storyType = await this.client.storyType.findUniqueOrThrow({
            where: {
                type: type
            }
        });

        return storyType;
    }
    
}

export { StoryPrismaRepository }