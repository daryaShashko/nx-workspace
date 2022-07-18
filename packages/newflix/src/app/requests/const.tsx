// export const API_BASE_URL = 'http://localhost:3333';
export const API_BASE_URL = '/';
export const API_PREFIX = 'api';

export const FILMS_URL = `${API_BASE_URL}/${API_PREFIX}/films`;
export const ADD_FILM_URL = `${FILMS_URL}/addFilm`;
export const DELETE_FILM_URL = `${FILMS_URL}`;
export const EDIT_FILM_URL = `${FILMS_URL}`;
export const SEARCH_FILMS_BY_TITLE_URL = `${FILMS_URL}/searchBy?title=`;
