import { PrismaClient } from "@prisma/client";
import { Epic } from "../../../domain/entities/Epic";
import { EpicRepository } from "../../../domain/repositories/EpicRepository";

class EpicPrismaRepository implements EpicRepository{

    private client: PrismaClient;

    constructor(){
        this.client = new PrismaClient();
    }

    async list(): Promise<Epic[]> {
        const epics = await this.client.epic.findMany();
        if(epics.length == 0) throw new Error('Nenhum épico registrado');
        
        return epics.map( (epic) => {
            return {
                id: epic.id,
                name: epic.name,
                description: epic.description,
                status: epic.status,
                createdAt: epic.createdAt
            }
        });
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

    async delete(id: string): Promise<void>{
        await this.client.epic.delete({
            where: {
                id: id
            }
        });
    }
}

export { EpicPrismaRepository }