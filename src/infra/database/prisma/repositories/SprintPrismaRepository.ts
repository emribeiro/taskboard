import { PrismaClient } from "@prisma/client";
import { Sprint } from "../../../../domain/entities/Sprint";
import { SprintRepository } from "../../../../domain/repositories/SprintRepository";
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

        return SprintMapper.toDomain(sprint);
    }


    async list(): Promise<Sprint[]> {
        const sprint = await this.client.sprint.findMany();

        return sprint.map( (item) => {
            return SprintMapper.toDomain(item)
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
                        story: {
                            include: {
                                storyType: true
                            }
                        }
                    }
                }
            }
        });

         return SprintMapper.toDomain(sprint);
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

}

export { SprintPrismaRepository }