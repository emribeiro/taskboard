import { container } from "tsyringe";
import { EpicRepository } from "../../domain/repositories/EpicRepository";
import { EpicPrismaRepository } from "../database/repositories/EpicPrismaRepository";
import { StoryRepository } from "../../domain/repositories/StoryRepository";
import { StoryPrismaRepository } from "../database/repositories/StoryPrismaRepository";
import { SprintRepository } from "../../domain/repositories/SprintRepository";
import { SprintPrismaRepository } from "../database/repositories/SprintPrismaRepository";


container.registerSingleton<EpicRepository>(
    'EpicRepository' ,
    EpicPrismaRepository    
);

container.registerSingleton<StoryRepository>(
    'StoryRepository' ,
    StoryPrismaRepository    
);

container.registerSingleton<SprintRepository>(
    'SprintRepository' ,
    SprintPrismaRepository   
);