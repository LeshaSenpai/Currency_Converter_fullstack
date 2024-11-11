export interface SuccessResponse<T> {
    success: true;
    message: string;
    data: T;
}

export interface FailureResponse {
    success: false;
    message: string;
    error: any;
}