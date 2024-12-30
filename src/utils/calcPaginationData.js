export const calcPaginationData = ({total, page, perPage}) => {
    const totalPages = Math.ceil(total / perPage);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        page,
        perPage,
        totalItems: total,
        totalPages,
        hasNextPage,
        hasPrevPage,
    };

};