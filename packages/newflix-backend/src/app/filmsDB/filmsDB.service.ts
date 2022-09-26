import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { FilmsDBRepository } from './filmsDB.repository';

@Injectable()
export class FilmsDBService {
    constructor(private readonly filmsBBRepository: FilmsDBRepository) {}

    async getFilmById(id: string): Promise<FilmDB> {
        return this.filmsBBRepository.findOne({ id });
    }

    async getFilms(): Promise<FilmDB[]> {
        return this.filmsBBRepository.find();
    }

    async createFilm(film: CreateFilmDB): Promise<FilmDB> {
        const filmForFile: FilmDB = {
            id: uuidv4(),
            poster_path: 'https://culturaldetective.files.wordpress.com/2012/04/movies-film.jpg',
            genres: film.genre,
            release_date: film.releaseDate,
            title: film.title,
            runtime: Number(film.duration),
            vote_average: 0,
            overview: film.description
        };
        return this.filmsBBRepository.create(filmForFile);
    }

    async updateFilm(id: string, filmUpdates: CreateFilmDB): Promise<FilmDB> {
        const newDataForTargetFilm = {
            genres: filmUpdates.genre,
            release_date: filmUpdates.releaseDate,
            title: filmUpdates.title,
            runtime: Number(filmUpdates.duration),
            overview: filmUpdates.description
        };

        return this.filmsBBRepository.findOneAndUpdate({ id }, newDataForTargetFilm);
    }
}
