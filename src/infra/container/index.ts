import { container } from "tsyringe";
import { EpicRepository } from "../../domain/repositories/EpicRepository";
import { EpicPrismaRepository } from "../database/repositories/EpicPrismaRepository";
import { StoryRepository } from "../../domain/repositories/StoryRepository";
import { StoryPrismaRepository } from "../database/repositories/StoryPrismaRepository";


container.registerSingleton<EpicRepository>(
    'EpicRepository' ,
    EpicPrismaRepository    
);

container.registerSingleton<StoryRepository>(
    'StoryRepository' ,
    StoryPrismaRepository    
);