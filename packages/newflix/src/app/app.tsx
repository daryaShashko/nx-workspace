import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, SearchBar, Logo, Films, FilmDescription, AddOrEditFilmForm, Pagination } from './components';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { FILMS_URL, SEARCH_FILMS_BY_TITLE_URL } from './requests';

import { Route, useHistory, Switch } from 'react-router-dom';
import { useState } from 'react';
import { FormData } from './components/AddOrEditFilmForm/types';
import { requestJSON } from './useFetch';
import { FilmPage } from './pages';

const Header = styled.header`
    padding: 0 0 80px 0;

    > div + div {
        margin-top: 40px;
    }
`;

export const App = React.memo(() => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const [films, setFilms] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    const [currPageForSearchResults, setCurrPageForSearchResults] = React.useState(1);
    const [pageCountForSearchResults, setPageCountForSearchResults] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const onChangePage = React.useCallback(async (page: number) => setCurrPage(page), []);
    const onChangePageForSearchResults = React.useCallback(
        async (page: number) => setCurrPageForSearchResults(page),
        []
    );

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(`${FILMS_URL}?page=${currPage}`);
            setFilms(resp.movies);
            setPageCount(resp.pageCount);
        })();
    }, [currPage]);

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(
                `${SEARCH_FILMS_BY_TITLE_URL}${searchBarValue}&page=${currPageForSearchResults}`
            );
            setFilms(resp.movies);
            setPageCount(resp.pageCount);
        })();
    }, [currPageForSearchResults]);

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;
        setSearchBarValue(value);
    };

    const onSaveFilm = (data: Partial<FormData>) => {
        console.log(data);
    };

    const onCancel = (data: Partial<FormData>) => {
        console.log(data);
    };

    const handleOnSearch = async () => {
        const x = await requestJSON(`${SEARCH_FILMS_BY_TITLE_URL}${searchBarValue}&page=${currPageForSearchResults}`);
        setFilms(x.movies);
        setPageCountForSearchResults(x.pageCount);
    };

    return (
        <Container>
            <Switch>
                <Route
                    path="/"
                    exact
                    render={() => (
                        <Header>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Logo />
                                <AddOrEditFilmForm onCancel={onCancel} onSave={onSaveFilm} />
                            </Stack>

                            <Stack spacing={2}>
                                <Typography variant="h4">Find your movie</Typography>
                                <SearchBar
                                    onChange={handleOnChangeSearch}
                                    onSearch={handleOnSearch}
                                    value={searchBarValue}
                                />
                            </Stack>
                        </Header>
                    )}
                />
                <Route
                    path="/films/:id"
                    render={({
                        match: {
                            params: { id }
                        }
                    }) => <FilmPage filmId={id} />}
                />
            </Switch>

            <Grid container spacing={8}>
                <Films films={films} />
            </Grid>
            <Grid container>
                {searchBarValue ? (
                    <Pagination
                        currentPage={currPageForSearchResults}
                        pageCount={pageCountForSearchResults}
                        onPageClick={onChangePageForSearchResults}
                    />
                ) : (
                    <Pagination currentPage={currPage} pageCount={pageCount} onPageClick={onChangePage} />
                )}
            </Grid>
        </Container>
    );
});
