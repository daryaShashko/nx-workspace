import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { FilmsDBRepository } from './filmsDB.repository';
import { FilterQuery } from 'mongoose';
import { FilmDTO, UpdateFilmDto } from './dto';

@Injectable()
export class FilmsDBService {
    constructor(private readonly filmsDBRepository: FilmsDBRepository) {}

    async getFilmById({ id }: { id: string }): Promise<FilmDTO> {
        return this.filmsDBRepository.findOne(id);
    }
    //
    // async findByQuery(id: string): Promise<FilmDB> {
    //     return this.filmsDBRepository.finById(id);
    // }

    async getFilms(query?: { title?: string; page?: string }): Promise<{ movies: FilmDTO[] }> {
        const films = await this.filmsDBRepository.find(query);
        return { movies: films };
    }

    async createFilm(film: UpdateFilmDto): Promise<FilmDTO> {
        return this.filmsDBRepository.create(film);
    }

    async updateFilm({ id }: { id: string }, film: UpdateFilmDto): Promise<FilmDTO> {
        return this.filmsDBRepository.findOneAndUpdate(id, film);
    }

    async deleteFilm({ id }: { id: string }): Promise<FilmDTO> {
        return this.filmsDBRepository.findOneAndDelete(id);
    }
}
