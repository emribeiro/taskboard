
interface TaskRepository{
    done(taskId: string): Promise<void>;
    delete(taskId: string): Promise<void>;
}

export { TaskRepository }