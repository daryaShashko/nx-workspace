import React, { ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { Button, SearchBar, Logo, FilmItem, FilmDescription, AddOrEditFilmForm } from './components';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import NxWelcome from './nx-welcome';
import { FILMS_URL, SEARCH_FILMS_BY_TITLE_URL } from './requests';

import { Route, Link, useHistory, Switch } from 'react-router-dom';
import { useState } from 'react';
import { FormData } from './components/AddOrEditFilmForm/types';
import { requestJSON, useFetch } from './useFetch';

const Header = styled.header`
    padding: 0 0 80px 0;

    > div + div {
        margin-top: 40px;
    }
`;

export const App = React.memo(() => {
    const [searchBarValue, setSearchBarValue] = useState('');
    const history = useHistory();
    const [allFilms] = useFetch(FILMS_URL);

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
        const x = await requestJSON(`${SEARCH_FILMS_BY_TITLE_URL}${searchBarValue}`);
        console.log(x);
        console.log('should search by searchBarValue', searchBarValue);
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
                    }) => (
                        <Header>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Logo />
                                <Button startIcon={<AddIcon />} onClick={() => history.push('/')}>
                                    Find Film
                                </Button>
                            </Stack>

                            <FilmDescription
                                id={id}
                                genre={`films_${id}`}
                                date={new Date()}
                                title={`Title_${id}`}
                                duration={120}
                                rate={4}
                                description={
                                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, magni maiores numquam provident quia temporibus!'
                                }
                            />
                        </Header>
                    )}
                />
            </Switch>

            <Grid container spacing={8}>
                {allFilms &&
                    allFilms
                        .slice(0, 19)
                        .map(
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
            </Grid>
        </Container>
    );
});
