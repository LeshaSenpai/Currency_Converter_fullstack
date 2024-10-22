"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failureResponse = exports.successResponse = void 0;
const successResponse = (res, message, data, statusCode = 200) => {
    const response = {
        success: true,
        message,
        data,
    };
    return res.status(statusCode).json(response);
};
exports.successResponse = successResponse;
const failureResponse = (res, message, statusCode = 500, error = null) => {
    const response = {
        success: false,
        message,
        error,
    };
    return res.status(statusCode).json(response);
};
exports.failureResponse = failureResponse;
