
export interface IOptions {
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: string;
}

interface IOptionsResult{
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}

const calculatePagination = (options: IOptions):IOptionsResult => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder === "asc" ? "asc" : "desc";

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
    };
};

export const paginationHelper = {
    calculatePagination,
};