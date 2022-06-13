import { PaginationProps } from './types';
import * as React from 'react';
import MPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const Pagination: React.FC<PaginationProps> = ({ currentPage, pageCount, onPageClick }) => {
    return (
        <Stack spacing={2}>
            <MPagination
                count={pageCount}
                showFirstButton
                showLastButton
                onChange={(event, pageNumber) => onPageClick(pageNumber)}
            />
        </Stack>
    );
};
