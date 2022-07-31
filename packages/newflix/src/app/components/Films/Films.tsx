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
import { useSnackbar } from 'notistack';

const initState = {
    genres: [],
    id: '',
    overview: '',
    poster_path: '',
    release_date: '',
    runtime: 0,
    title: ''
};

export const Films: React.FC<{ films: FilmResponse[] }> = ({ films }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [editItem, setEditItem] = React.useState<FilmResponse>(initState);
    const [deleteItem, setDeleteItem] = React.useState<FilmResponse>(initState);
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
            history.replace('/');
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
                films.map((item) => (
                    <Grid item xs={4} key={item.id}>
                        <FilmItem
                            title={item.title}
                            date={new Date(item.release_date)}
                            genre={item.genres}
                            img={item.poster_path}
                            onClick={() => history.push(`/films/${item.id}`)}
                            onEdit={() => {
                                setEditItem(item);
                                openEditDialog();
                            }}
                            onDelete={() => {
                                setDeleteItem(item);
                                openDeleteDialog();
                            }}
                        />
                    </Grid>
                ))}
            <Dialog
                title={`Delete ${deleteItem.title}`}
                description={`Are you sure want to delete film ${deleteItem.title} from data base`}
                onAgree={() => onDeleteFilm(deleteItem.id)}
                onDisagree={closeDeleteDialog}
                ref={deleteDialogRef}
            />

            <AddOrEditFilmForm
                ref={editDialogRef}
                releaseDate={editItem.release_date}
                title={editItem.title}
                genre={editItem.genres}
                description={editItem.overview}
                duration={editItem.runtime.toString()}
                onSave={(data) => onEditFilm(data, editItem.id)}
                onCancel={closeEditDialog}
            />
        </>
    );
};
