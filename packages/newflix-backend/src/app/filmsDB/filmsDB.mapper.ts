import { FilmDTO } from './dto';
import { UpdateFilmDto } from './dto';

export class FilmsDBMapper {
    public static readonly defaultUrl: string = 'https://culturaldetective.files.wordpress.com/2012/04/movies-film.jpg';
    private static readonly defaultVoteAverage: number = 0;

    public static genUUID(): number {
        return +Date.now();
    }

    public static toView(film: any): FilmDTO {
        const filmForViewLayer = {
            //review with clean architectory perspective and use domaines
            id: String(film.id),
            poster_path: film.poster_path,
            genres: film.genres,
            release_date: film.release_date,
            title: film.title,
            overview: film.overview,
            runtime: film.runtime,
            vote_average: film.vote_average
        };

        return filmForViewLayer;
    }

    public static toPersistence(film: UpdateFilmDto): any {
        const filmForDataLayer = {
            genres: film.genre,
            release_date: film.releaseDate,
            title: film.title,
            runtime: Number(film.duration),
            overview: film.description
        };
        return filmForDataLayer;
    }

    public static toPersistenceInFile(film: UpdateFilmDto): any {
        const filmForDataLayer = {
            ...this.toPersistence(film),
            id: this.genUUID(),
            url: this.defaultUrl,
            vote_average: this.defaultVoteAverage
        };
        return filmForDataLayer;
    }
}
