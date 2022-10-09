import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { FilmsDBRepository } from './filmsDB.repository';
import { FilterQuery } from 'mongoose';
import { FilmDTO } from './dto/create-film.dto';

@Injectable()
export class FilmsDBService {
    constructor(private readonly filmsDBRepository: FilmsDBRepository) {}

    // async getFilmById(id: string): Promise<FilmDB> {
    //     return this.filmsDBRepository.finById(id);
    // }
    //
    // async findByQuery(id: string): Promise<FilmDB> {
    //     return this.filmsDBRepository.finById(id);
    // }

    async getFilms(query?: { title?: string; page?: string }): Promise<{ movies: FilmDTO[] }> {
        const films = await this.filmsDBRepository.find(query);
        return { movies: films };
    }
    //
    // async createFilm(film: CreateFilmDB): Promise<FilmDTO> {
    //     return this.filmsDBRepository.create(film);
    // }
    //
    // async updateFilm(id: string, filmUpdates: CreateFilmDB): Promise<FilmDB> {
    //     const newDataForTargetFilm = {
    //         genres: filmUpdates.genre,
    //         release_date: filmUpdates.releaseDate,
    //         title: filmUpdates.title,
    //         runtime: Number(filmUpdates.duration),
    //         overview: filmUpdates.description
    //     }; //should be in repository
    //
    //     return this.filmsDBRepository.findOneAndUpdate({ id }, newDataForTargetFilm);
    // }
}
