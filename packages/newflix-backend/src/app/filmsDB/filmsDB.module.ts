import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsDBController } from './filmsDB.controller';
import { FilmsDBService } from './filmsDB.service';
import { FilmDBSchema, FilmDB } from './filmsDB.schema';
import { FilmsDBRepository } from './filmsDB.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: FilmDB.name, schema: FilmDBSchema }])],
    controllers: [FilmsDBController],
    providers: [FilmsDBService, FilmsDBRepository]
})
export class FilmsDBModule {}
