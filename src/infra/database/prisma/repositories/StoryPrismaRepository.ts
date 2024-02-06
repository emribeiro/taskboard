import { PrismaClient } from "@prisma/client";
import { StoryRepository } from "../../../../domain/repositories/StoryRepository";
import { Story } from "../../../../domain/entities/Story";
import { StoryMapper } from "../mappers/StoryMapper";



class StoryPrismaRepository implements StoryRepository{
    private client: PrismaClient;

    constructor(){
        this.client = new PrismaClient();
    }

    async get(storyId: string): Promise<Story> {
        const story = await this.client.story.findUniqueOrThrow(
            {
                where: {
                    id: storyId
                },
                include: {
                    storyType: true,
                    tasks: true
                }
            }
        )
        
        return StoryMapper.toDomain(story);
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

    async addTasks(storyId: string, tasks: string[]): Promise<Story> {
        const story = await this.client.story.update({
            where: {
                id: storyId
            },
            data: {
                tasks: {
                    create: tasks.map( (task) => ({
                        description: task
                    }))
                }
            },
            include: {
                tasks: true,
                storyType: true
            }
        });

        return StoryMapper.toDomain(story);
    }
    
}

export { StoryPrismaRepository }