import { ButtonProps as MUIButtonProps } from '@mui/material/Button';

export type ButtonProps = Pick<MUIButtonProps, 'size' | 'type' | 'startIcon' | 'onClick'>;
