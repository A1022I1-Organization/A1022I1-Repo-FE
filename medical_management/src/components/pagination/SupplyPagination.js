import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRanges() {
    return (
        <Stack spacing={2}>
            <Pagination count={10} defaultPage={1} siblingCount={0} />
        </Stack>
    );
}