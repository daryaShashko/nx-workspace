import Stack from '@mui/material/Stack';
import { Button, FilmDescription, Logo } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { requestJSON } from '../../useFetch';
import { FILMS_URL } from '../../requests';
import { FilmResponseExtended } from '../../components/types.shared';

const Header = styled.header`
    padding: 0 0 80px 0;

    > div + div {
        margin-top: 40px;
    }
`;

export const FilmPage: React.FC<{ filmId: string }> = ({ filmId }) => {
    const history = useHistory();
    const [film, setFilm] = React.useState<FilmResponseExtended>();

    React.useEffect(() => {
        (async () => {
            const resp = await requestJSON(`${FILMS_URL}/${filmId}`);
            setFilm(resp);
        })();
    }, [filmId]);

    return (
        <Header>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Logo />
                <Button startIcon={<AddIcon />} onClick={() => history.push('/')}>
                    Find Film
                </Button>
            </Stack>

            {film && (
                <FilmDescription
                    id={film.id}
                    img={film.poster_path}
                    genre={film.genres}
                    date={new Date(film.release_date)}
                    title={film.title}
                    duration={film.runtime}
                    rate={film.vote_average}
                    description={film.overview}
                />
            )}
        </Header>
    );
};
