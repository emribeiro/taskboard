import { StoryStatus } from "./StoryStatus";
import { StoryType } from "./StoryType";
import { Task } from "./Task";

interface Story{
    id: string;
    title: string;
    type: StoryType;
    status: StoryStatus;
    points: number;
    startedAt?: Date;
    finishedAt?: Date;
    acceptanceCriteria?: string;
    epicId?: string;

    tasks?: Task[]
}

export { Story }