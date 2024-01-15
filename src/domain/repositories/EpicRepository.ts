import { Epic } from "../entities/Epic"

interface EpicRepository{
     create(name: string, description: string): Promise<Epic>;
}

export { EpicRepository }