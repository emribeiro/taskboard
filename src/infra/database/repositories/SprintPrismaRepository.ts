import { PrismaClient } from "@prisma/client";
import { Sprint } from "../../../domain/entities/Sprint";
import { SprintRepository } from "../../../domain/repositories/SprintRepository";

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


    list(): Promise<Sprint[]> {
        throw new Error("Method not implemented.");
    }

    async getActive(): Promise<Sprint | null> {
        const sprint = await this.client.sprint.findFirst({
            where: {
                status: 1
            }
        });

        if(sprint == null) return null;


        return {
            id: sprint.id,
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            dueDate: sprint.dueDate
        }
    }
    addStories(sprintId: string, stories: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export { SprintPrismaRepository }