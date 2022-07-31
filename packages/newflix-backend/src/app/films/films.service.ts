import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { accessSync, writeFileSync } from 'fs';
import * as fs from 'fs/promises';

export type FilmExtended = {
    id: string;
    poster_path: string;
    genres: string[];
    release_date: string;
    title: string;
    runtime: number;
    vote_average: number;
    overview: string;
};

export type FilmFromBody = {
    releaseDate: string | null;
    title: string;
    genre: string;
    description: string;
    duration: string;
};

@Injectable()
export class FilmsService {
    filename = '';
    constructor() {
        this.filename = resolve(process.cwd(), 'packages/newflix-backend/src/assets/data', 'movies.json');

        this.getAccessToFile();
    }

    private getAccessToFile(): void {
        try {
            accessSync(this.filename);
        } catch (err) {
            writeFileSync(this.filename, '[]');
            console.error(err);
        }
    }

    private async getAllMovies() {
        let movies;
        await fs
            .readFile(this.filename, 'utf8')
            .then((data) => (movies = JSON.parse(data)))
            .catch((error) => {
                throw new Error(error);
            });
        return movies || [];
    }

    async getAll(page = 1) {
        const allMovies = await this.getAllMovies();
        const perPage = 9;
        const totalPosts = allMovies.length;
        const totalPages = Math.ceil(totalPosts / perPage);
        const start = (+page - 1) * perPage;
        let end = start + perPage;
        if (end > totalPosts) {
            end = totalPosts;
        }

        return {
            currentPage: page,
            perPage: perPage,
            totalCount: totalPosts,
            pageCount: totalPages,
            start: start,
            end: end,
            movies: allMovies.slice(start, end)
        };
    }

    async findByQuery(query, page) {
        const allMovies = await this.getAllMovies().then((data) =>
            data?.filter((item) => new RegExp(query, 'i').test(item.title))
        );
        const perPage = 9;
        const totalPosts = allMovies.length;
        const totalPages = Math.ceil(totalPosts / perPage);
        const start = (+page - 1) * perPage;
        let end = start + perPage;
        if (end > totalPosts) {
            end = totalPosts;
        }

        return {
            currentPage: page,
            perPage: perPage,
            totalCount: totalPosts,
            pageCount: totalPages,
            start: start,
            end: end,
            movies: allMovies.slice(start, end)
        };
    }

    async getById(id) {
        const movies = await this.getAllMovies();
        if (movies.length) {
            return movies.find((item) => +item.id === +id);
        }
        return movies;
    }

    async addFilm(film: FilmFromBody) {
        const filmForFile = {
            id: new Date().getTime(),
            poster_path: 'https://culturaldetective.files.wordpress.com/2012/04/movies-film.jpg',
            genres: film.genre,
            release_date: film.releaseDate,
            title: film.title,
            runtime: film.duration,
            vote_average: 0,
            overview: film.description
        };
        await fs
            .readFile(this.filename, 'utf8')
            .then(async (data) => {
                const x = JSON.parse(data).concat(filmForFile);
                await fs.writeFile(this.filename, JSON.stringify(x));
            })
            .catch((error) => {
                throw new Error(error);
            });
        return filmForFile;
    }

    async changeFilm(id, film) {
        const newDataForTargetFilm = {
            genres: film.genre,
            release_date: film.releaseDate,
            title: film.title,
            runtime: film.duration,
            overview: film.description
        };

        const targetFilm = await this.getById(id);
        const mergedFilm = { ...targetFilm, ...newDataForTargetFilm };

        await fs
            .readFile(this.filename, 'utf8')
            .then(async (data) => {
                const films = JSON.parse(data);
                const newFilms = films.map((film) => {
                    if (film.id.toString() === id.toString()) {
                        return mergedFilm;
                    }
                    return film;
                });
                await fs.writeFile(this.filename, JSON.stringify(newFilms));
            })
            .catch((error) => {
                throw new Error(error);
            });
        return mergedFilm;
    }

    async delete(id) {
        await fs
            .readFile(this.filename, 'utf8')
            .then(async (data) => {
                const x = JSON.parse(data).filter((item) => +item.id !== +id);
                await fs.writeFile(this.filename, JSON.stringify(x));
            })
            .catch((error) => {
                throw new Error(error);
            });
        return id;
    }
}
