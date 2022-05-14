import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { Button, SearchBar, Logo, FilmItem, FilmDescription } from './components';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import NxWelcome from './nx-welcome';

import { Route, Link, useHistory, Switch } from 'react-router-dom';
import { useState } from 'react';

const Header = styled.header`
    padding: 40px 0;

    > div + div {
        margin-top: 40px;
    }
`;

export function App() {
    const [searchBarValue, setSearchBarValue] = useState('');
    const history = useHistory();

    const handleOnChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value }
        } = event;
        setSearchBarValue(value);
    };

    const handleOnSearch = () => console.log('should search by searchBarValue', searchBarValue);
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
                                <Button startIcon={<AddIcon />}>Add Film</Button>
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

            <Grid container spacing={2}>
                {Array.from({ length: 10 }).map((number, index) => (
                    <Grid item xs={4} key={index}>
                        <FilmItem
                            title={`some title_${index}`}
                            date={new Date()}
                            genre={'some genres'}
                            onClick={() => history.push(`/films/${index}`)}
                        />
                    </Grid>
                ))}
            </Grid>

            {/* START: routes */}
            {/* These routes and navigation have been generated for you */}
            {/* Feel free to move and update them to fit your needs */}
            {/*<br/>*/}
            {/*<hr/>*/}
            {/*<br/>*/}
            {/*<div role="navigation">*/}
            {/*  <ul>*/}
            {/*    <li><Link to="/">Home</Link></li>*/}
            {/*    <li><Link to="/page-2">Page 2</Link></li>*/}
            {/*  </ul>*/}
            {/*</div>*/}

            {/*/!* END: routes *!/*/}
        </Container>
    );
}

export default App;
