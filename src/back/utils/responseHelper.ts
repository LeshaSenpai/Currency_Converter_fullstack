import { Response } from 'express';
import { SuccessResponse, FailureResponse } from './responseTypes';

export const successResponse = <T>(res: Response, message: string, data: T, statusCode: number = 200): Response => {
    const response: SuccessResponse<T> = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
export const failureResponse = (res: Response, message: string, statusCode: number = 500, error: any = null): Response => {
    const response: FailureResponse = {
        success: false,
        message,
        error,
    };
    return res.status(statusCode).json(response);
};
