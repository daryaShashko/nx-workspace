export type PaginationProps = {
    currentPage: number;
    pageCount: number;
    onPageClick: (page: number) => void;
};
