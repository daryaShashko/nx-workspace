import { FilmDB } from '../filmsDB.schema';

export class FilmDTO {
    id: string;
    poster_path: string;
    genres: string[];
    release_date: string;
    title: string;
    runtime: number;
    vote_average: number;
    overview: string;

    constructor(film?: any) {
        this.id = String(film.id);
        this.release_date = film.release_date;
        this.title = film.title;
        this.genres = film.genres;
        this.overview = film.overview;
        this.runtime = film.runtime;
        this.vote_average = film.vote_average;
        this.poster_path = film.poster_path;
    }
}
