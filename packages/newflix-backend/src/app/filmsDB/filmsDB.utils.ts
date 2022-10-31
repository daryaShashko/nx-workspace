import { PaginatedResults } from './dto';

export const paginate = <T>(
    data: T[],
    totalCount: number,
    page?: number,
    perPageItems?: number
): PaginatedResults<T> => {
    const totalPages = Math.ceil(totalCount / perPageItems);
    const start = (page - 1) * perPageItems;
    let end = start + perPageItems;
    if (end > totalCount) {
        end = totalCount;
    }
    return {
        currentPage: page,
        perPage: perPageItems,
        totalCount,
        pageCount: totalPages,
        start,
        end,
        data
    };
};
