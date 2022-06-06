import { Injectable } from '@nestjs/common';
import { AppService } from '../app.service';
import { resolve } from 'path';
import { accessSync, createReadStream, writeFileSync, ReadStream, readFile } from 'fs';
import * as fs from 'fs';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

@Injectable()
export class FilmsService {
    filename = '';
    constructor() {
        this.filename = resolve(process.cwd(), 'packages/newflix-backend/src/assets/data', 'movies.json');

        this.getAccessToFile();
    }

    private getAccessToFile(): void {
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
            console.error(err);
        }
    }
    getAll(): ReadStream {
        return fs.createReadStream(this.filename, { encoding: 'utf8' });
    }

    async findByQuery(query) {
        let movies;
        let data;
        await fs.promises
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
