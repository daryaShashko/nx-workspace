import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';

import { CreateFilmDB, FilmDB } from './filmsDB.schema';
import { FilmsDBService } from './filmsDB.service';
import { ApiParam } from '@nestjs/swagger';
import { CreateFilmDto } from './dto';

@Controller('filmsDB')
export class FilmsDBController {
    constructor(private readonly FilmsDBService: FilmsDBService) {}

    @Get()
    async getFilms(@Query() query: string): Promise<CreateFilmDto[]> {
        const films = await this.FilmsDBService.getFilms();
        const x = films.map((el) => new CreateFilmDto(el));
        return x;
    }

    @Get('/searchBy')
    async getByQuery(@Query() query: string) {
        console.log('----query', query);
        // const x = await this.filmsService.findByQuery(query.title, query.page);
        // return x;
    }

    @Get('/:id')
    async getById(@Param() { id }) {
        const film = await this.FilmsDBService.getFilmById(id);

        return new CreateFilmDto(film);
    }

    @Post('/addFilm')
    async addNewFilm(@Body() body: CreateFilmDB): Promise<FilmDB> {
        return this.FilmsDBService.createFilm(body);
        // const x = await this.filmsService.addFilm(body);
        // return x;
    }

    @Patch('/:id')
    async changeFilm(@Param('userId') id: string, @Body() filmDto: CreateFilmDB): Promise<FilmDB> {
        return this.FilmsDBService.updateFilm(id, filmDto);
    }

    @Delete('/:id')
    @ApiParam({ name: 'id' })
    async deleteFilmById(@Param('id') id: string) {
        console.log('-----delete', id);
        // const x = await this.filmsService.delete(id);
        // return x;
    }
}
