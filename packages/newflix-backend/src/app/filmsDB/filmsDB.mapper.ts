import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { v4 as uuidv4 } from 'uuid';
import { FilmDTO } from './dto/create-film.dto';
import {UpdateFilmDto} from "./dto";

//
// export abstract class Mapper<DomainEntityOrValueObject> {
//     // public static toDomain (raw: any): T;
//     // public static toDTO (t: T): DTO;
//     // public static toPersistence (t: T): any;
// }

export class FilmsDBMapper {
    public static toDomain(film: any): FilmDTO {
        const domainFilm = {
            //review with clean architectory perspective and use domaines
            id: String(film.id),
            release_date: film.release_date,
            title: film.title,
            genres: film.genres,
            overview: film.overview,
            runtime: film.runtime,
            vote_average: film.vote_average,
            poster_path: film.poster_path
        };

        return domainFilm;
    }

    public static toPersistence(film: UpdateFilmDto): any {
        const filmForDB: FilmDB = {
            //review with clean architectory perspective and use domaines
            id: uuidv4(),
            poster_path: 'https://culturaldetective.files.wordpress.com/2012/04/movies-film.jpg',
            genres: film.genre,
            release_date: film.releaseDate,
            title: film.title,
            runtime: Number(film.duration),
            vote_average: 0,
            overview: film.description
        };
        return filmForDB;
    }
}
