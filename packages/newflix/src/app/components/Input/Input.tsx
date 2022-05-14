import * as React from 'react';
import { BaseLayoutProps } from '../types.shared';
import { InputProps } from './types';
import { TextField } from '@mui/material';

export const Input: React.FC<BaseLayoutProps & InputProps> = ({
    id,
    label,
    children,
    onChange,
    placeholder,
    value,
    disabled,
    ...props
}) => {
    return (
        <TextField
            id={id}
            label={label}
            variant="standard"
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            {...props}>
            {children}
        </TextField>
    );
};
