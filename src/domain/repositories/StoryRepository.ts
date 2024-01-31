import { Story } from "../entities/Story";
import { StoryType } from "../entities/StoryType";

interface StoryRepository{
    create(title: string, type: number, points: number, acceptanceCriteria?: string, epicId?: string): Promise<Story>;
    getStoryType(type: number): Promise<StoryType>;
}

export { StoryRepository }