import * as React from 'react';
export type BaseLayoutProps = {
    children?: React.ReactNode;
};

export type FilmResponseExtended = {
    id: string;
    poster_path: string;
    genres: string[];
    release_date: string;
    title: string;
    runtime: number;
    vote_average: number;
    overview: string;
};

export type FilmResponse = Pick<FilmResponseExtended, 'id' | 'poster_path' | 'genres' | 'release_date' | 'title'>;
