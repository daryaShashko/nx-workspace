import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { FilmDB, FilmDBDocument } from './filmsDB.schema';

@Injectable()
export class FilmsDBRepository {
    constructor(@InjectModel(FilmDB.name) private FilmDbModel: Model<FilmDBDocument>) {}

    async findOne(filmsDBFilterQuery: FilterQuery<FilmDB>): Promise<FilmDB> {
        return this.FilmDbModel.findOne(filmsDBFilterQuery);
    }

    async find(): Promise<FilmDB[]> {
        const x = await this.FilmDbModel.find().exec();
        return x;
    }

    async create(film: FilmDB): Promise<FilmDB> {
        const newUser = new this.FilmDbModel(film);
        return newUser.save();
    }

    async findOneAndUpdate(filmsDBFilterQuery: FilterQuery<FilmDB>, film: Partial<FilmDB>): Promise<FilmDB> {
        return this.FilmDbModel.findOneAndUpdate(filmsDBFilterQuery, film, { new: true });
    }
}
