import React, { ChangeEvent, useEffect, useState, useCallback, useImperativeHandle } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { Button } from '../Button';
import { FormData, AddOrEditFilmFormProps } from './types';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components';

const StyledDialogContent = styled.div`
    padding: 20px 0;
`;

export type DialogImperativeHandlersProps = { openDialog: () => void; closeDialog: () => void };

export const AddOrEditFilmForm = React.forwardRef<DialogImperativeHandlersProps, AddOrEditFilmFormProps>(
    ({ releaseDate, title, genre, description, duration, onSave, onCancel }, ref) => {
        const [data, setData] = useState<Partial<FormData>>(() => ({
            releaseDate,
            title,
            genre,
            description,
            duration
        }));

        const [open, setOpen] = useState<boolean>(false);

        useImperativeHandle(ref, () => ({
            openDialog() {
                setOpen(true);
            },
            closeDialog() {
                setOpen(false);
            }
        }));

        useEffect(() => {
            if (releaseDate || title || genre || description || duration) {
                setData({ releaseDate, title, genre, description, duration });
            }
        }, [releaseDate, title, genre, description, duration]);

        const handleInputChange = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                const { name, value } = e.target;
                if (name === 'genre') {
                    return setData({ ...data, [name]: value.split(',').map((str) => str.trim()) });
                }
                setData({
                    ...data,
                    [name]: value
                });
            },
            [data]
        );

        const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
            onSave(data);
        };

        const onReset = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
            onCancel(data);
        };

        const handleClose = useCallback(() => {
            setOpen(false);
        }, []);

        const handleOpen = useCallback(() => {
            setOpen(true);
        }, []);

        return (
            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title">
                    <DialogTitle id="alert-dialog-title">{'Add new film'}</DialogTitle>
                    <DialogContent
                        sx={{
                            padding: '20 0'
                        }}>
                        <form onSubmit={onSubmit} onReset={onReset}>
                            <StyledDialogContent>
                                <Stack spacing={3}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DatePicker
                                            label="Release date"
                                            value={data.releaseDate || null}
                                            onChange={(value) => {
                                                setData((s) => ({ ...s, releaseDate: moment(value).format() }));
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    required
                                                    id="film-release-date"
                                                    helperText={null}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <TextField
                                        required
                                        id="film-title"
                                        name={'title'}
                                        label="Title"
                                        value={data.title}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        name={'genre'}
                                        required
                                        id="film-genre"
                                        label="Genre"
                                        value={data.genre}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        name={'description'}
                                        required
                                        id="film-overview"
                                        label="Overview"
                                        value={data.description}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        name={'duration'}
                                        required
                                        id="film-duration"
                                        label="Duration"
                                        value={data.duration}
                                        onChange={handleInputChange}
                                    />
                                </Stack>
                            </StyledDialogContent>
                            <DialogActions>
                                <Stack spacing={3} direction={'row'} justifyContent="flex-end">
                                    <Button variant="outlined" type={'reset'}>
                                        Cancel
                                    </Button>
                                    <Button type={'submit'}>Save</Button>
                                </Stack>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
);
