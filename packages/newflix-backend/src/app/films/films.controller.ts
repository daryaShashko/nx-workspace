import { Controller, Get, Param, Query, Post, Delete, Body, Patch } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmDTO, PaginatedResults, UpdateFilmDto } from '../filmsDB/dto';

@Controller('films')
export class FilmsController {
    constructor(private readonly FilmsService: FilmsService) {}

    @Get()
    async getFilms(@Query() { page }: { page: string }): Promise<PaginatedResults<FilmDTO>> {
        return this.FilmsService.getFilms({ page: Number(page) });
    }

    @Get('/searchBy')
    async getByQuery(@Query() { title, page }: { title: string; page: string }): Promise<PaginatedResults<FilmDTO>> {
        return this.FilmsService.getFilms({ title, page: Number(page) });
    }

    @Get('/:id')
    async getById(@Param() params: { id: string }): Promise<FilmDTO> {
        return await this.FilmsService.getFilmById(params);
    }

    @Post('/addFilm')
    async addNewFilm(@Body() film: UpdateFilmDto): Promise<FilmDTO> {
        return await this.FilmsService.createFilm(film);
    }

    @Patch('/:id')
    async changeFilm(@Param() params: { id: string }, @Body() film: UpdateFilmDto): Promise<FilmDTO> {
        return await this.FilmsService.updateFilm(params, film);
    }

    @Delete('/:id')
    async deleteFilm(@Param() params: { id: string }): Promise<FilmDTO> {
        return await this.FilmsService.deleteFilm(params);
    }
}
