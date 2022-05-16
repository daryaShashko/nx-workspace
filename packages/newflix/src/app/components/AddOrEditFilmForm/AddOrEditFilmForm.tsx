import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import { Button } from '../Button';
import { FormData, AddOrEditFilmFormProps } from './types';

export const AddOrEditFilmForm: React.FC<AddOrEditFilmFormProps> = ({
    releaseDate,
    title,
    genre,
    description,
    duration,
    onSave,
    onCancel
}) => {
    const [data, setData] = useState<Partial<FormData>>(() => ({
        releaseDate,
        title,
        genre,
        description,
        duration
    }));

    useEffect(() => {
        if (releaseDate || title || genre || description || duration) {
            setData({ releaseDate, title, genre, description, duration });
        }
    }, [releaseDate, title, genre, description, duration]);

    const handleInputChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setData({
                ...data,
                [name]: value
            });
        },
        [data]
    );

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSave(data);
    };

    const onReset = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onCancel(data);
    };

    return (
        <form onSubmit={onSubmit} onReset={onReset}>
            <Stack spacing={3}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                        label="Release date"
                        value={data.releaseDate || null}
                        onChange={(value) => {
                            setData((s) => ({ ...s, releaseDate: moment(value).format() }));
                        }}
                        renderInput={(params) => (
                            <TextField {...params} required id="film-release-date" helperText={null} />
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
                <Stack spacing={3} direction={'row'} justifyContent="flex-end">
                    <Button type={'reset'}>Cancel</Button>
                    <Button type={'submit'}>Save</Button>
                </Stack>
            </Stack>
        </form>
    );
};
