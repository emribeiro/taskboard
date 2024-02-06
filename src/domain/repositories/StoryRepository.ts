import { Story } from "../entities/Story";

interface StoryRepository{
    create(title: string, type: number, points: number, acceptanceCriteria?: string, epicId?: string): Promise<Story>;
    listAll(): Promise<Story[]>;
    addTasks(storyId: string, tasks: string[]): Promise<Story>;
    get(storyId: string): Promise<Story>;
}

export { StoryRepository }