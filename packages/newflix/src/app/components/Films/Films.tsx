import * as React from 'react';
import Grid from '@mui/material/Grid';
import { FilmItem } from '../FilmItem';
import { FilmResponse } from '../types.shared';
import { useHistory } from 'react-router-dom';
import { Dialog } from '../Dialog';
import { DialogImperativeHandlersProps } from '../Dialog/Dialog';
import { AddOrEditFilmForm } from '../AddOrEditFilmForm';
import { requestJSON } from '../../useFetch';
import { ADD_FILM_URL, DELETE_FILM_URL, EDIT_FILM_URL } from '../../requests';
import { FormData } from '../AddOrEditFilmForm/types';
import { useSnackbar } from 'notistack';

export const Films: React.FC<{ films: FilmResponse[] }> = ({ films }) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const deleteDialogRef = React.useRef<DialogImperativeHandlersProps>(null);
    const editDialogRef = React.useRef<DialogImperativeHandlersProps>(null);

    const openDeleteDialog = () => {
        deleteDialogRef.current?.openDialog();
    };

    const closeDeleteDialog = () => {
        deleteDialogRef.current?.closeDialog();
    };

    const openEditDialog = () => {
        editDialogRef.current?.openDialog();
    };

    const closeEditDialog = () => {
        editDialogRef.current?.closeDialog();
    };

    const onDeleteFilm = async (id: string) => {
        try {
            await requestJSON(`${DELETE_FILM_URL}/${id}`, { method: 'DELETE' });
            deleteDialogRef.current?.closeDialog();
            enqueueSnackbar('Film is deleted', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Some error', { variant: 'error' });
        }
    };

    const onEditFilm = async (data: Partial<FormData>, id: string) => {
        try {
            await requestJSON(`${EDIT_FILM_URL}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
            editDialogRef.current?.closeDialog();
            enqueueSnackbar('Film is changed', { variant: 'success' });
        } catch (err) {
            enqueueSnackbar('Some error', { variant: 'error' });
        }
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
                            onEdit={openEditDialog}
                            onDelete={openDeleteDialog}
                        />
                        <Dialog
                            title={`Delete ${title}`}
                            description={`Are you sure want to delete film ${title} from data base`}
                            onAgree={() => onDeleteFilm(id)}
                            onDisagree={closeDeleteDialog}
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
                            onCancel={closeEditDialog}
                        />
                    </Grid>
                ))}
        </>
    );
};
