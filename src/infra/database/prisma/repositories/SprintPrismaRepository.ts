import { PrismaClient } from "@prisma/client";
import { Sprint } from "../../../../domain/entities/Sprint";
import { SprintRepository } from "../../../../domain/repositories/SprintRepository";
import { StoryStatus } from "../../../../domain/entities/StoryStatus";
import { SprintMapper } from "../mappers/SprintMapper";

class SprintPrismaRepository implements SprintRepository{

    private client: PrismaClient;

    constructor(){
        this.client = new PrismaClient();
    }
    

    async create(name: string, startDate: Date, dueDate: Date): Promise<Sprint> {
        const sprint = await this.client.sprint.create({
            data: {
                name,
                status: 1,
                startDate,
                dueDate
            }
        });

        return {
            id: sprint.id,
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            dueDate: sprint.dueDate
        };
    }


    async list(): Promise<Sprint[]> {
        const sprint = await this.client.sprint.findMany();

        return sprint.map( (item) => {
            return {
                id: item.id,
                name: item.name,
                status: item.status,
                startDate: item.startDate,
                dueDate: item.dueDate,
                endDate: item.endDate != null ? item.endDate : undefined
            }
        });
    }

    async getActive(): Promise<Sprint | null> {
        const sprint = await this.client.sprint.findFirst({
            where: {
                status: 1
            },
            include: {
                stories: {
                    include: {
                        story: {
                            include: {
                                storyType: true
                            }
                        }
                    }
                }
            }
        });

        if(sprint == null) return null;

        console.log(sprint)


        return SprintMapper.toDomain(sprint);
    }

    async getById(sprintId: string): Promise<Sprint>{
        const sprint = await this.client.sprint.findUniqueOrThrow({
            where: {
                id: sprintId
            },
            include: {
                stories: {
                    include: {
                        story: true
                    }
                }
            }
        });

         return {
            id: sprint.id,
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            dueDate: sprint.dueDate,
            endDate: sprint.endDate != null ? sprint.endDate : undefined
        }
    }
    async addStories(sprintId: string, stories: string[]): Promise<void> {
        const storiesToConnect = stories.map( ( story ) => {
            return {
                storyId: story,
                sprintId
            }
        });

        await this.client.sprint.update({
            where: {
                id: sprintId
            },
            data: {
                stories: {
                    connectOrCreate: storiesToConnect.map( (story) => ({
                        where: { storyId_sprintId: story},
                        create: { storyId: story.storyId, isDone: false}
                    }))
                }
            },
            include: {
                stories: true
            }
        })
        
    }

    async finishStory(sprintId: string): Promise<void> {
        
        await this.client.sprint.update({
            where: {
                id: sprintId
            },
            data: {
                status: 2
            }
        })
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

export { SprintPrismaRepository }