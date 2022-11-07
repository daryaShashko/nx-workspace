import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { accessSync, PathLike, writeFileSync } from 'fs';
import * as fs from 'fs/promises';
import { FilmDTO, UpdateFilmDto } from '../filmsDB/dto';
import { FilmsDBMapper } from '../filmsDB/filmsDB.mapper';
import { InjectModel } from '@nestjs/mongoose';
import { FilmDB, FilmDBDocument } from '../filmsDB/filmsDB.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilmsRepository {
    constructor(private readonly filename: PathLike, public filmsCount: number) {
        this.filename = resolve(__dirname, 'src', '../assets/data', 'movies.json');
        this.filmsCount = 0;
        this.getAccessToFile();
    }

    get totalFilmsCount(): number {
        return this.filmsCount;
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
        let movies = [];
        await fs
            .readFile(this.filename, 'utf8')
            .then((data) => (movies = JSON.parse(data)))
            .catch((error) => {
                throw new Error(error);
            });
        this.filmsCount = movies.length;
        return movies;
    }

    private async getById(id) {
        const movies = await this.getAllMovies();
        if (movies.length) {
            return movies.find((item) => +item.id === +id);
        }
        return movies;
    }

    async findOne(id: string): Promise<FilmDTO> {
        const film = await this.getById(id);
        return FilmsDBMapper.toView(film);
    }

    async find(title: string, page: number, perPageItems: number): Promise<FilmDTO[]> {
        const allMovies = await this.getAllMovies();
        const start = (+page - 1) * perPageItems;
        let end = start + perPageItems;
        if (end > allMovies.length) {
            end = allMovies.length;
        }
        const films = allMovies.slice(start, end);
        return films.map(FilmsDBMapper.toView);
    }

    async create(film: UpdateFilmDto): Promise<FilmDTO> {
        const persistenceFilm = FilmsDBMapper.toPersistenceInFile(film);
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const mergedData = await JSON.parse(data).concat(persistenceFilm);
            await fs.writeFile(this.filename, JSON.stringify(mergedData));
        } catch (error) {
            throw new Error(error);
        }
        this.filmsCount += 1;
        return FilmsDBMapper.toView(persistenceFilm);
    }

    async findOneAndUpdate(id: string, film: UpdateFilmDto): Promise<FilmDTO> {
        const targetFilm = await this.getById(id);
        const persistenceFilm = FilmsDBMapper.toPersistence(film);
        const mergedFilm = { ...targetFilm, ...persistenceFilm };

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
        return FilmsDBMapper.toView(mergedFilm);
    }

    async findOneAndDelete(id: string): Promise<FilmDTO> {
        let film = {};
        await fs
            .readFile(this.filename, 'utf8')
            .then(async (data) => {
                film = JSON.parse(data).filter((item) => item.id.toString() !== id.toString());
                await fs.writeFile(this.filename, JSON.stringify(film));
            })
            .catch((error) => {
                throw new Error(error);
            });
        this.filmsCount -= 1;
        return FilmsDBMapper.toView(film);
    }
}
