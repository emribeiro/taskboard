
interface CreateStoryDTO{
    title: string;
    type: number;
    points: number;
    acceptanceCriteria?: string;
    epicId?: string;
}

export { CreateStoryDTO }