import { Story } from "@prisma/client";
import { Story as StoryDomain } from "../../../../domain/entities/Story";
import { StoryStatus } from "../../../../domain/entities/StoryStatus";


class StoryMapper{

    static toDomain(story: Story): StoryDomain {
        const domain: StoryDomain = {
            id: story.id,
                title: story.title,
                type: {
                    type: story.storyType.type,
                    description: story.storyType.description
                },
                status: this.getStoryStatus(story.status),
                points: story.points,
                acceptanceCriteria: story.acceptanceCriteria == null ? undefined : story.acceptanceCriteria,
                epicId: story.epicId == null ? undefined : story.epicId
        }

        return domain;
    } 

    private static getStoryStatus(status: number): StoryStatus{
        const BACKLOG = 0;
        const DOING = 1;
        const DONE = 2;

        let description =  '';

        switch(status){
            case BACKLOG: 
                description = 'Backlog'; 
                break;
            case DOING:
                description = 'Fazendo';
                break;
            case DONE:
                description = 'Feito';
                break;
            default:
                throw new Error('Status not found: ' + status); 
        }

        return {
            code: status,
            description
        }

    }

}

export { StoryMapper }