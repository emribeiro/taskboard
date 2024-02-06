import { container } from "tsyringe";
import { EpicRepository } from "../../domain/repositories/EpicRepository";
import { EpicPrismaRepository } from "../database/prisma/repositories/EpicPrismaRepository";
import { StoryRepository } from "../../domain/repositories/StoryRepository";
import { StoryPrismaRepository } from "../database/prisma/repositories/StoryPrismaRepository";
import { SprintRepository } from "../../domain/repositories/SprintRepository";
import { SprintPrismaRepository } from "../database/prisma/repositories/SprintPrismaRepository";


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