import { Injectable } from '@nestjs/common';
import { FilmsDBRepository } from './filmsDB.repository';
import { FilmDTO, PaginatedResults, UpdateFilmDto } from './dto';
import { paginate } from './filmsDB.utils';
import { DEFAULT_ITEMS_PER_PAGE } from './filmdDB.const';

@Injectable()
export class FilmsDBService {
    constructor(private readonly filmsDBRepository: FilmsDBRepository) {}

    async getFilmById({ id }: { id: string }): Promise<FilmDTO> {
        return this.filmsDBRepository.findOne(id);
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
        const filmsCount = await this.filmsDBRepository.getCount();
        const films = await this.filmsDBRepository.find(title, page, perPageItems);

        return paginate<FilmDTO>(films, filmsCount, page, perPageItems);
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
