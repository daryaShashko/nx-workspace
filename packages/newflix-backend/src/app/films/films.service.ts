import { FilmsRepository } from './films.repository';
import { FilmDTO, PaginatedResults, UpdateFilmDto } from '../filmsDB/dto';
import { DEFAULT_ITEMS_PER_PAGE } from '../filmsDB/filmdDB.const';
import { paginate } from '../filmsDB/filmsDB.utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
    constructor(private readonly filmsRepository: FilmsRepository) {}

    async getFilmById({ id }: { id: string }): Promise<FilmDTO> {
        return this.filmsRepository.findOne(id);
    }

    async getFilms({
        title = '',
        page = 1,
        perPageItems = DEFAULT_ITEMS_PER_PAGE
    }: {
        title?: string;
        page?: number;
        perPageItems?: number;
    }): Promise<PaginatedResults<FilmDTO>> {
        const filmsCount = this.filmsRepository.totalFilmsCount;
        const films = await this.filmsRepository.find(title, page, perPageItems);

        return paginate<FilmDTO>(films, filmsCount, page, perPageItems);
    }

    async createFilm(film: UpdateFilmDto): Promise<FilmDTO> {
        return this.filmsRepository.create(film);
    }

    async updateFilm({ id }: { id: string }, film: UpdateFilmDto): Promise<FilmDTO> {
        return this.filmsRepository.findOneAndUpdate(id, film);
    }

    async deleteFilm({ id }: { id: string }): Promise<FilmDTO> {
        return this.filmsRepository.findOneAndDelete(id);
    }
}
