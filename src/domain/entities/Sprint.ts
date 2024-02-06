import { Story } from "./Story";

interface Sprint{
    id: string;
    name: string;
    status: number;
    startDate: Date;
    dueDate: Date;
    endDate?: Date;

    stories?: [{
        isDone: boolean,
        story: Story
    }]

}

export { Sprint }