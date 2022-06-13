import * as React from 'react';
import Grid from '@mui/material/Grid';
import { FilmItem } from '../FilmItem';
import { requestJSON, useFetch } from '../../useFetch';
import { FILMS_URL } from '../../requests';
import { useHistory } from 'react-router-dom';
import { Pagination } from '../Pagination';

export const Films: React.FC = () => {
    const [films, setFilms] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    const history = useHistory();
    const [allFilms] = useFetch(FILMS_URL);
    const changePage = React.useCallback(async (page: number) => setCurrPage(page), []);

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(`${FILMS_URL}?page=${currPage}`);
            setFilms(resp.movies);
        })();
    }, [currPage]);

    return (
        <>
            {films &&
                films.map(
                    ({
                        id,
                        title,
                        release_date,
                        poster_path,
                        genres
                    }: {
                        id: number;
                        title: string;
                        release_date: string;
                        poster_path: string;
                        genres: string[];
                    }) => (
                        <Grid item xs={4} key={id}>
                            <FilmItem
                                title={title}
                                date={new Date(release_date)}
                                genre={genres}
                                img={poster_path}
                                onClick={() => history.push(`/films/${id}`)}
                            />
                        </Grid>
                    )
                )}
            {allFilms && (
                <Pagination
                    currentPage={allFilms.currentPage}
                    pageCount={allFilms.pageCount}
                    onPageClick={changePage}
                />
            )}
        </>
    );
};
