import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { resolve } from 'path';
import { accessSync, createReadStream, writeFileSync, ReadStream } from 'fs';
import * as fs from 'fs/promises';
import { Simulate } from 'react-dom/test-utils';

@Injectable()
export class FilmsService {
    filename = '';
    constructor() {
        this.filename = resolve(process.cwd(), 'packages/newflix-backend/src/assets/data', 'movies.json');

        this.getAccessToFile();
    }

    private getAccessToFile(): void {
        try {
            accessSync(this.filename);
        } catch (err) {
            writeFileSync(this.filename, '[]');
            console.error(err);
        }
    }
    getAll(): ReadStream {
        return createReadStream(this.filename, { encoding: 'utf8' });
    }

    async findByQuery(query) {
        let movies;
        let data;
        await fs
            .readFile(this.filename, 'utf8')
            .then((data) => (movies = JSON.parse(data)))
            .catch((error) => {
                throw new Error(error);
            });
        if (movies) {
            data = movies.filter((item) => new RegExp(query, 'i').test(item.title));
            return data;
        }
        return [];
    }
}
