import {Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';

import { FilmDB, FilmDBDocument } from './filmsDB.schema';
import { FilmsDBMapper } from './filmsDB.mapper';
import { FilmDTO } from './dto';

@Injectable()
export class FilmsDBRepository {
    constructor(@InjectModel(FilmDB.name) private FilmDbModel: Model<FilmDBDocument>) {}

    // async finById(id: string): Promise<FilmDB> {
    //     return this.FilmDbModel.findOne({ id: +id });
    // }
    //
    // async findOne(filmsDBFilterQuery: FilterQuery<FilmDB>): Promise<FilmDB> {
    //     //{ title: { $regex: query.title, $options: 'i' }
    //     return this.FilmDbModel.findOne(filmsDBFilterQuery);
    // }

    async find(filmsDBFilterQuery?: { page?: string; title?: string }): Promise<FilmDTO[]> {
        const adjustedQuery: FilterQuery<FilmDB> = new Query();
        if (filmsDBFilterQuery.title) {
            adjustedQuery.setQuery({ title: { $regex: filmsDBFilterQuery.title, $options: 'i' } });
        }
        const films = await this.FilmDbModel.find(adjustedQuery).exec();
        return films.map(FilmsDBMapper.toDomain);
    }

    // async create(film: CreateFilmDB): Promise<FilmDTO> {
    //     const persistenceFilm = FilmsDBMapper.toPersistence(film);
    //     try {
    //         const newFilm = new this.FilmDbModel(persistenceFilm);
    //         return FilmsDBMapper.toDomain(newFilm);
    //     } catch (err) {
    //         throw Error(err);
    //     }
    // }
    //
    // async findOneAndUpdate(filmsDBFilterQuery: FilterQuery<FilmDB>, film: Partial<FilmDB>): Promise<FilmDB> {
    //     return this.FilmDbModel.findOneAndUpdate(filmsDBFilterQuery, film, { new: true });
    // }
}
