import { Sprint } from "../entities/Sprint"

interface SprintRepository{
    create(name: string, startDate: Date, dueDate: Date): Promise<Sprint>;
    list(): Promise<Sprint[]>;
    getActive(): Promise<Sprint | null>;
    getById(sprintId: string): Promise<Sprint>;
    addStories(sprintid: string, stories: string[]): Promise<void>;
    finishStory(sprintId: string): Promise<void>;
}

export { SprintRepository }