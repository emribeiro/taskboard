import { Sprint } from "@prisma/client";
import { Sprint as SprintDomain} from './../../../../domain/entities/Sprint';

class SprintMapper{

    static toDomain(sprint: Sprint): SprintDomain{
        let domain: SprintDomain = {
            id: sprint.id,
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            dueDate: sprint.dueDate,
        }

        return domain;
    }
}

export { SprintMapper }