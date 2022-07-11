import * as React from 'react';
import Grid from '@mui/material/Grid';
import { FilmItem } from '../FilmItem';
import { FilmResponse } from '../types.shared';
import { useHistory } from 'react-router-dom';
import { Dialog } from '../Dialog';
import { DialogImperativeHandlersProps } from '../Dialog/Dialog';
import { AddOrEditFilmForm } from '../AddOrEditFilmForm';
import { requestJSON } from '../../useFetch';
import { DELETE_FILM_URL, EDIT_FILM_URL } from '../../requests';
import { FormData } from '../AddOrEditFilmForm/types';

export const Films: React.FC<{ films: FilmResponse[] }> = ({ films }) => {
    const history = useHistory();
    const deleteDialogRef = React.useRef<DialogImperativeHandlersProps>(null);
    const editDialogRef = React.useRef<DialogImperativeHandlersProps>(null);

    const toggleDeleteDialog = () => {
        deleteDialogRef.current?.toggleDialog();
    };

    const toggleEditDialog = () => {
        editDialogRef.current?.toggleDialog();
    };

    const onDeleteFilm = async (id: string) => {
        const x = await requestJSON(`${DELETE_FILM_URL}/${id}`, { method: 'DELETE' });
        console.log('onDeleteFilm', x);
        deleteDialogRef.current?.toggleDialog();
    };

    const onEditFilm = async (data: Partial<FormData>, id: string) => {
        const x = await requestJSON(`${EDIT_FILM_URL}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
        console.log('onDeleteFilm', x);
        editDialogRef.current?.toggleDialog();
    };

    return (
        <>
            {films &&
                films.map(({ id, title, release_date, poster_path, genres, overview, runtime }) => (
                    <Grid item xs={4} key={id}>
                        <FilmItem
                            title={title}
                            date={new Date(release_date)}
                            genre={genres}
                            img={poster_path}
                            onClick={() => history.push(`/films/${id}`)}
                            onEdit={toggleEditDialog}
                            onDelete={toggleDeleteDialog}
                        />
                        <Dialog
                            title={`Delete ${title}`}
                            description={`Are you sure want to delete film ${title} from data base`}
                            onAgree={() => onDeleteFilm(id)}
                            onDisagree={toggleDeleteDialog}
                            ref={deleteDialogRef}
                        />

                        <AddOrEditFilmForm
                            ref={editDialogRef}
                            releaseDate={release_date}
                            title={title}
                            genre={genres}
                            description={overview}
                            duration={runtime.toString()}
                            onSave={(data) => onEditFilm(data, id)}
                            onCancel={toggleDeleteDialog}
                        />
                    </Grid>
                ))}
        </>
    );
};
