import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { v4 as uuidv4 } from 'uuid';
import { FilmDTO } from './dto/create-film.dto';
import {UpdateFilmDto} from "./dto";

//
// export abstract class Mapper<DomainEntityOrValueObject> {
//     // public static toView (raw: any): T;
//     // public static toDTO (t: T): DTO;
//     // public static toPersistence (t: T): any;
// }

export class FilmsDBMapper {
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
}
