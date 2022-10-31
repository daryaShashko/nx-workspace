export type PaginatedResults<T> = {
    currentPage: number;
    perPage: number;
    totalCount: number;
    pageCount: number;
    start: number;
    end: number;
    data: T[];
};

