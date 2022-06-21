import * as React from 'react';
import Grid from '@mui/material/Grid';
import { FilmItem } from '../FilmItem';
import { FilmResponse } from '../types.shared';
import { useHistory } from 'react-router-dom';

export const Films: React.FC<{ films: FilmResponse[] }> = ({ films }) => {
    const history = useHistory();
    return (
        <>
            {films &&
                films.map(({ id, title, release_date, poster_path, genres }) => (
                    <Grid item xs={4} key={id}>
                        <FilmItem
                            title={title}
                            date={new Date(release_date)}
                            genre={genres}
                            img={poster_path}
                            onClick={() => history.push(`/films/${id}`)}
                        />
                    </Grid>
                ))}
        </>
    );
};
