import { Epic } from "../entities/Epic"

interface EpicRepository{
     create(name: string, description: string): Promise<Epic>;
     list(): Promise<Epic[]>
     delete(id: string): Promise<void>;
}

export { EpicRepository }