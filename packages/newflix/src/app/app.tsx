import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, SearchBar, Logo, Films, AddOrEditFilmForm, Pagination } from './components';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { ADD_FILM_URL, FILMS_URL, SEARCH_FILMS_BY_TITLE_URL } from './requests';
import { useSnackbar } from 'notistack';

import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { FormData } from './components/AddOrEditFilmForm/types';
import { requestJSON } from './useFetch';
import { FilmPage } from './pages';
import AddIcon from '@mui/icons-material/Add';
import { DialogImperativeHandlersProps } from './components/Dialog/Dialog';

const Header = styled.header`
    padding: 0 0 80px 0;

    > div + div {
        margin-top: 40px;
    }
`;

function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const App = React.memo(() => {
    const editDialogRef = React.useRef<DialogImperativeHandlersProps>(null);
    const [searchBarValue, setSearchBarValue] = useState('');
    const [films, setFilms] = React.useState([]);
    const [currPage, setCurrPage] = React.useState(1);
    const [currPageForSearchResults, setCurrPageForSearchResults] = React.useState(1);
    const [pageCountForSearchResults, setPageCountForSearchResults] = React.useState(0);
    const [pageCount, setPageCount] = React.useState(0);
    const onChangePage = React.useCallback(async (page: number) => setCurrPage(page), []);
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const location = useLocation();
    const query = useQuery();
    const onChangePageForSearchResults = React.useCallback(
        async (page: number) => setCurrPageForSearchResults(page),
        []
    );

    React.useEffect(() => {
        (async () => {
            if (location.pathname === '/search' && !query.get('title')) {
                const resp = await requestJSON(`${FILMS_URL}?page=${currPage}`);
                console.log(resp);
                setSearchBarValue('');
                setFilms(resp.movies);
                setPageCount(1);
                // setPageCount(resp.pageCount);
            }
        })();
        return () => setSearchBarValue('');
    }, [query.get('title'), location.pathname]);

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(`${FILMS_URL}?page=${currPage}`);
            setFilms(resp.movies);
            setPageCount(1);
            // setPageCount(resp.pageCount);
        })();
    }, [currPage]);

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(
                `${SEARCH_FILMS_BY_TITLE_URL}${searchBarValue}&page=${currPageForSearchResults}`
            );
            setFilms(resp.movies);
            setPageCount(1);
            // setPageCount(resp.pageCount);
        })();
    }, [currPageForSearchResults]);

    const openEditDialog = () => {
        editDialogRef.current?.openDialog();
    };

    const closeEditDialog = () => {
        editDialogRef.current?.closeDialog();
    };

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;
        setSearchBarValue(value);
    };

    const onSaveFilm = async (data: Partial<FormData>) => {
        try {
            await requestJSON(ADD_FILM_URL, {
                method: 'POST',
                body: JSON.stringify(data)
            });
            history.replace(`/`);
            enqueueSnackbar('Film is saved', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Some error', { variant: 'error' });
        }
    };

    const onCancel = (data: Partial<FormData>) => {
        closeEditDialog();
    };

    const handleOnSearch = async () => {
        history.push(`/search?title=${searchBarValue}`);
        const x = await requestJSON(`${SEARCH_FILMS_BY_TITLE_URL}${searchBarValue}&page=${currPageForSearchResults}`);

        setFilms(x.movies);
        setPageCountForSearchResults(1);
        // setPageCountForSearchResults(x.pageCount);
    };

    return (
        <Container>
            <Switch>
                <Redirect exact from="/" to="/search" />
                <Route
                    path="/search"
                    render={() => (
                        <Header>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Logo />
                                <Button startIcon={<AddIcon />} onClick={openEditDialog}>
                                    Add Film
                                </Button>
                                <AddOrEditFilmForm ref={editDialogRef} onCancel={onCancel} onSave={onSaveFilm} />
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
