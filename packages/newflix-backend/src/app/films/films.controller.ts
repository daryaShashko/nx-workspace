import { Controller, Get, Param, Query, Post, Put, Delete, Body, Request } from '@nestjs/common';
import { AppService } from '../app.service';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private readonly appService: AppService, private readonly filmsService: FilmsService) {}

    @Get()
    async getFilms(@Query() query) {
        const x = await this.filmsService.getAll(query.page);
        return x;
    }

    @Get('/searchBy')
    async getByQuery(@Query() query) {
        const x = await this.filmsService.findByQuery(query.title, query.page);
        return x;
    }

    @Get('/:id')
    async getById(@Param() { id }) {
        const x = await this.filmsService.getById(id);
        return x;
    }

    @Post('/addFilm')
    async addNewFilm(@Body() body) {
        console.log(body);
        const x = await this.filmsService.addFilm(body);
        return x;
    }

    // @Put('/:id')
    // async getById(@Param() { id }) {
    //     const x = await this.filmsService.getById(id);
    //     return x;
    // }

    // @Delete('/:id')
    // async getById(@Param() { id }) {
    //     const x = await this.filmsService.getById(id);
    //     return x;
    // }
}
