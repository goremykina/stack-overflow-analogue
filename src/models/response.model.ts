export interface QueryResponse<T> {
    data: QueryResponseData<T>;
}

export interface QueryResponseData<T> {
    data: T;
    meta: QueryResponseMeta;
}

export interface QueryResponseMeta {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: string[];
}

export interface ResponseWithMessage<T> {
    data: T;
    message: string;
}