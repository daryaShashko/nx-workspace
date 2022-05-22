import * as React from 'react';
import MUIButton from '@mui/material/Button';
import { ButtonProps } from './types';
import { BaseLayoutProps } from '../types.shared';

export const Button: React.FunctionComponent<BaseLayoutProps & ButtonProps> = ({
    children,
    size,
    type,
    startIcon,
    onClick,
    variant
}) => (
    <MUIButton variant={variant || 'contained'} size={size} onClick={onClick} type={type} startIcon={startIcon}>
        {children}
    </MUIButton>
);
