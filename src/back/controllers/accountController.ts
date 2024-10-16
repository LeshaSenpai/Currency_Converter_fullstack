import { Request, Response } from 'express';
import { registerUser, loginUser, getUsername } from '../services/accountService';
import { successResponse, failureResponse } from '../utils/responseHelper';
import {
    ERROR_INVALID_REGISTRATION_DATA,
    SUCCESS_USER_REGISTERED,
    ERROR_REGISTRATION,
    ERROR_INVALID_LOGIN_DATA,
    SUCCESS_LOGIN,
    ERROR_LOGIN,
    ERROR_LOGIN_NOT_PROVIDED,
    SUCCESS_USERNAME_FOUND,
    ERROR_FETCH_USERNAME,
} from '../constant';

export const registerAccount = async (req: Request, res: Response) => {
    const { username, login, password } = req.body;

    if (!username || !login || !password) {
        return failureResponse(res, ERROR_INVALID_REGISTRATION_DATA, 400);
    }

    try {
        const result = await registerUser(username, login, password);
        successResponse(res, SUCCESS_USER_REGISTERED, result.data, result.status);
    } catch (err) {
        failureResponse(res, ERROR_REGISTRATION, 500, err);
    }
};

export const loginAccount = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return failureResponse(res, ERROR_INVALID_LOGIN_DATA, 400);
    }

    try {
        const result = await loginUser(login, password);
        successResponse(res, SUCCESS_LOGIN, result.data, result.status);
    } catch (err) {
        failureResponse(res, ERROR_LOGIN, 500, err);
    }
};

export const fetchUsername = async (req: Request, res: Response) => {
    const login = req.query.login as string;

    if (!login) {
        return failureResponse(res, ERROR_LOGIN_NOT_PROVIDED, 400);
    }

    try {
        const result = await getUsername(login);
        successResponse(res, SUCCESS_USERNAME_FOUND, result.data, result.status);
    } catch (err) {
        failureResponse(res, ERROR_FETCH_USERNAME, 500, err);
    }
};
