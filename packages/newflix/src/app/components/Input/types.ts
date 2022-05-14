import { TextFieldProps as MUIInputProps } from '@mui/material/TextField';

export type InputProps = Pick<
    MUIInputProps,
    'id' | 'label' | 'disabled' | 'onChange' | 'value' | 'placeholder' | 'fullWidth'
>;
