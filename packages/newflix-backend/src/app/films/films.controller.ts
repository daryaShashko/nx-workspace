import { Controller, Get, Response, StreamableFile, Query } from '@nestjs/common';
import { AppService } from '../app.service';
import { FilmsService } from './films.service';
import { createReadStream, ReadStream, accessSync, writeFileSync } from 'fs';
import { resolve } from 'path';

@Controller('films')
export class FilmsController {
    constructor(private readonly appService: AppService, private readonly filmsService: FilmsService) {}

    @Get()
    getFilms() {
        const readableStream = this.filmsService.getAll();
        return new StreamableFile(readableStream);
    }

    @Get('/searchBy')
    async getByQuery(@Query() query) {
        console.log('---query', query);
        const x = await this.filmsService.findByQuery(query.title);
        console.log('-----x', x);
        return x;
    }
}
