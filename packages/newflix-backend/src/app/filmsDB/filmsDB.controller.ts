import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { FilmsDBService } from './filmsDB.service';
import {FilmDTO, UpdateFilmDto} from './dto';

// use JOI (validation)

@Controller('filmsDB')
export class FilmsDBController {
    constructor(private readonly FilmsDBService: FilmsDBService) {}

    @Get()
    async getFilms(@Query() query: { page: string }): Promise<{ movies: FilmDTO[] }> {
        return this.FilmsDBService.getFilms(query);
    }

    @Get('/searchBy')
    async getByQuery(@Query() query: { title: string; page: string }): Promise<{ movies: FilmDTO[] }> {
        return this.FilmsDBService.getFilms(query);
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
