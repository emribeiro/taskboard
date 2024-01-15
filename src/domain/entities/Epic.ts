
interface Epic{

    id: string,
    name: string,
    description: string,
    status: number,
    createdAt: Date,
    finishedAt?: Date
}

export {Epic}