import { Sprint } from "@prisma/client";
import { Sprint as SprintDomain} from './../../../../domain/entities/Sprint';
import { StoryMapper } from "./StoryMapper";

class SprintMapper{

    static toDomain(sprint: Sprint): SprintDomain{
        let domain: SprintDomain = {
            id: sprint.id,
            name: sprint.name,
            status: sprint.status,
            startDate: sprint.startDate,
            dueDate: sprint.dueDate,
            stories: sprint.stories.map( (story) => ({
                isDone: story.isDone,
                story: StoryMapper.toDomain(story.story)
            }))
        }

        return domain;
    }
}

export { SprintMapper }