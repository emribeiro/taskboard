
import { Task as TaskSchema } from "@prisma/client"
import { Task } from "../../../../domain/entities/Task"

class TaskMapper{

    static toDomain(task: TaskSchema): Task{
        return {
            id: task.id,
            description: task.description,
            isDone: task.isDone,
            doneAt: task.doneAt ? task.doneAt : undefined
        }
    }
}

export { TaskMapper }