import { PrismaClient } from "@prisma/client";
import { StoryRepository } from "../../../domain/repositories/StoryRepository";
import { Story } from "../../../domain/entities/Story";
import { StoryType } from "../../../domain/entities/StoryType";
import { StoryStatus } from "../../../domain/entities/StoryStatus";



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
            type: storyType,
            status: this.getStoryStatus(story.status),
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

    async listAll(): Promise<Story[]> {
        const stories = await this.client.story.findMany({ include: { storyType: true}});
        
        const mappedStories = stories.map( (story): Story => {
            return {
                id: story.id,
                title: story.title,
                type: {
                    type: story.storyType.type,
                    description: story.storyType.description
                },
                status: this.getStoryStatus(story.status),
                points: story.points,
                acceptanceCriteria: story.acceptanceCriteria == null ? undefined : story.acceptanceCriteria,
                epicId: story.epicId == null ? undefined : story.epicId
    
            }
        });

        return mappedStories;
    }

    private getStoryStatus(status: number): StoryStatus{
        const BACKLOG = 0;
        const DOING = 1;
        const DONE = 2;

        let description =  '';

        switch(status){
            case BACKLOG: 
                description = 'Backlog'; 
                break;
            case DOING:
                description = 'Fazendo';
                break;
            case DONE:
                description = 'Feito';
                break;
            default:
                throw new Error('Status not found: ' + status); 
        }

        return {
            code: status,
            description
        }

    }
    
}

export { StoryPrismaRepository }