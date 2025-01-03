export const calcPaginationData = (count, perPage, page) => {
    const totalPages = Math.ceil(count / perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPrevPage = page !== 1;

    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPrevPage,
    };

};