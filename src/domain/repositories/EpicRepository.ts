import { Epic } from "../entities/Epic"

interface EpicRepository{
     create(name: string, description: string): Promise<Epic>;
     list(): Promise<Epic[]>
}

export { EpicRepository }