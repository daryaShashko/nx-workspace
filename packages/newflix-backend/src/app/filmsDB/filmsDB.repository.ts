import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Query } from 'mongoose';

import { FilmDB, FilmDBDocument } from './filmsDB.schema';
import { FilmsDBMapper } from './filmsDB.mapper';
import { FilmDTO, UpdateFilmDto } from './dto';

@Injectable()
export class FilmsDBRepository {
    constructor(@InjectModel(FilmDB.name) private FilmDbModel: Model<FilmDBDocument>) {}

    async getCount(): Promise<number> {
        return this.FilmDbModel.countDocuments();
    }

    async findOne(id: string): Promise<FilmDTO> {
        const adjustedQuery: FilterQuery<FilmDB> = new Query();
        if (id) {
            adjustedQuery.setQuery({ id: +id });
        }
        const film = await this.FilmDbModel.findOne(adjustedQuery);
        return FilmsDBMapper.toView(film);
    }

    async find(title: string, page: number, perPageItems: number): Promise<FilmDTO[]> {
        const adjustedQuery: FilterQuery<FilmDB> = new Query();
        if (title) {
            adjustedQuery.setQuery({ title: { $regex: title, $options: 'i' } });
        }
        const films = await this.FilmDbModel.find(adjustedQuery)
            .skip((page - 1) * perPageItems)
            .limit(perPageItems)
            .exec();
        return films.map(FilmsDBMapper.toView);
    }

    async create(film: UpdateFilmDto): Promise<FilmDTO> {
        const persistenceFilm = FilmsDBMapper.toPersistence(film);
        try {
            const newFilm = new this.FilmDbModel(persistenceFilm);
            await this.FilmDbModel.create(newFilm);
            return FilmsDBMapper.toView(newFilm);
        } catch (err) {
            throw Error(err);
        }
    }

    async findOneAndUpdate(id: string, film: UpdateFilmDto): Promise<FilmDTO> {
        const persistenceFilm = FilmsDBMapper.toPersistence(film);
        const adjustedQuery: FilterQuery<FilmDB> = new Query();
        if (id) {
            adjustedQuery.setQuery({ id: +id });
        }
        const updatedFilm = await this.FilmDbModel.findOneAndUpdate(
            adjustedQuery,
            { $set: persistenceFilm },
            { new: true }
        );
        return FilmsDBMapper.toView(updatedFilm);
    }

    async findOneAndDelete(id: string): Promise<FilmDTO> {
        const adjustedQuery: FilterQuery<FilmDB> = new Query();
        if (id) {
            adjustedQuery.setQuery({ id: +id });
        }
        const updatedFilm = await this.FilmDbModel.findOneAndDelete(adjustedQuery);
        return FilmsDBMapper.toView(updatedFilm);
    }
}
