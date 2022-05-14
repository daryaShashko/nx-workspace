import * as React from 'react';
import { BaseLayoutProps } from '../types.shared';
import { Input } from '../Input';
import { Button } from '../Button';
import { ChangeEventHandler } from 'react';
import Stack from '@mui/material/Stack';

export type SearchBarProps = {
    onChange: ChangeEventHandler;
    onSearch: () => void;
    value: string;
};

export const SearchBar: React.FC<BaseLayoutProps & SearchBarProps> = ({ onChange, onSearch, value }) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch();
    };

    return (
        <form onSubmit={onSubmit}>
            <Stack direction={'row'} spacing={2}>
                <Input fullWidth value={value} onChange={onChange} />
                <Button type={'submit'}>Search</Button>
            </Stack>
        </form>
    );
};
