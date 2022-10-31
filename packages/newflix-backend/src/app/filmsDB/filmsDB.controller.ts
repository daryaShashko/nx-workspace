import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { FilmsDBService } from './filmsDB.service';
import { FilmDTO, UpdateFilmDto } from './dto';
import { PaginationResults } from './filmsDB.service';

// use JOI (validation)

@Controller('filmsDB')
export class FilmsDBController {
    constructor(private readonly FilmsDBService: FilmsDBService) {}

    @Get()
    async getFilms(@Query() { page }: { page: string }): Promise<PaginationResults<FilmDTO>> {
        const x = await this.FilmsDBService.getFilms({ page: Number(page) })
        console.log(x)
        return this.FilmsDBService.getFilms({ page: Number(page) });
    }

    @Get('/searchBy')
    async getByQuery(@Query() { title, page }: { title: string; page: string }): Promise<PaginationResults<FilmDTO>> {
        return this.FilmsDBService.getFilms({ title, page: Number(page) });
    }

    @Get('/:id')
    async getById(@Param() params: { id: string }): Promise<FilmDTO> {
        return await this.FilmsDBService.getFilmById(params);
    }

    @Post('/addFilm')
    async addNewFilm(@Body() film: UpdateFilmDto): Promise<FilmDTO> {
        return await this.FilmsDBService.createFilm(film);
    }

    @Patch('/:id')
    async changeFilm(@Param() params: { id: string }, @Body() film: UpdateFilmDto): Promise<FilmDTO> {
        return await this.FilmsDBService.updateFilm(params, film);
    }

    @Delete('/:id')
    async deleteFilm(@Param() params: { id: string }): Promise<FilmDTO> {
        return await this.FilmsDBService.deleteFilm(params);
    }
}
