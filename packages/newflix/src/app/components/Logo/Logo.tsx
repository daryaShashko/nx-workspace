import * as React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

export const Logo: React.FC<ChipProps> = () => (
    <Chip
        icon={<OndemandVideoIcon />}
        label={
            <p>
                <strong>New</strong>Flix
            </p>
        }
    />
);
