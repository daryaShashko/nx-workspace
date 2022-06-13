import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { accessSync, writeFileSync } from 'fs';
import * as fs from 'fs/promises';

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

    private async getAllMovies() {
        let movies;
        await fs
            .readFile(this.filename, 'utf8')
            .then((data) => (movies = JSON.parse(data)))
            .catch((error) => {
                throw new Error(error);
            });
        return movies || [];
    }

    async getAll(page = 1) {
        const allMovies = await this.getAllMovies();
        const perPage = 9;
        const totalPosts = allMovies.length;
        const totalPages = Math.ceil(totalPosts / perPage);
        const start = (+page - 1) * perPage;
        let end = start + perPage;
        if (end > totalPosts) {
            end = totalPosts;
        }

        return {
            currentPage: page,
            perPage: perPage,
            totalCount: totalPosts,
            pageCount: totalPages,
            start: start,
            end: end,
            movies: allMovies.slice(start, end)
        };
    }

    async findByQuery(query) {
        const movies = await this.getAllMovies();
        if (movies.length) {
            return movies.filter((item) => new RegExp(query, 'i').test(item.title));
        }
        return movies;
    }
}
