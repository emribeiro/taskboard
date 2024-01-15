import { PrismaClient } from "@prisma/client";
import { Epic } from "../../../domain/entities/Epic";
import { EpicRepository } from "../../../domain/repositories/EpicRepository";

class EpicPrismaRepository implements EpicRepository{

    private client: PrismaClient;

    constructor(){
        this.client = new PrismaClient();
    }

    async create(name: string, description: string): Promise<Epic> {
        const epic = await this.client.epic.create({
            data: {
                name,
                description
            }
        });

        return {
            id: epic.id,
            name: epic.name,
            description: epic.description,
            status: epic.status,
            createdAt: epic.createdAt
        }
    }
}

export { EpicPrismaRepository }