interface Story{
    id: string;
    title: string;
    type: {
        code: number;
        description: string;
    },
    points: number;
    startedAt?: Date;
    finishedAt?: Date;
    acceptanceCriteria?: string;
    epicId?: string;
}

export { Story }