import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { CreateFilmDB } from './filmsDB.schema';
import { FilmsDBService } from './filmsDB.service';
import { ApiParam } from '@nestjs/swagger';
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
    //
    // @Patch('/:id')
    // async changeFilm(@Param('userId') id: string, @Body() filmDto: CreateFilmDB): Promise<FilmDB> {
    //     return this.FilmsDBService.updateFilm(id, filmDto);
    // }
    //
    // @Delete('/:id')
    // @ApiParam({ name: 'id' })
    // async deleteFilmById(@Param('id') id: string) {
    //     console.log('-----delete', id);
    //     // const x = await this.filmsService.delete(id);
    //     // return x;
    // }
}
