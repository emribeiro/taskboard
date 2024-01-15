import { container } from "tsyringe";
import { EpicRepository } from "../../domain/repositories/EpicRepository";
import { EpicPrismaRepository } from "../database/repositories/EpicPrismaRepository";


container.registerSingleton<EpicRepository>(
    'EpicRepository' ,
    EpicPrismaRepository    
);