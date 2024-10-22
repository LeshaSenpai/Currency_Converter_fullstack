
export type SuccessResponse<T> = {
    success: true;
    message: string;
    data: T;
};

export type FailureResponse = {
    success: false;
    message: string;
    error: any;
};
