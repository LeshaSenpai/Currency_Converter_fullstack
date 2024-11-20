import { Request, Response } from 'express';
import { registerUser, loginUser, getUsername } from '../services/accountService';
import { successResponse, failureResponse } from '../utils/responseHelper';
import {
    error_invalid_registration_data,
    success_user_registered,
    error_registration,
    error_invalid_login_data,
    success_login,
    error_login,
    error_login_not_provided,
    success_username_found,
    error_fetch_username
} from '../constant';

export const registerAccount = async (req: Request, res: Response) => {
    const { username, login, password } = req.body;

    if (!username || !login || !password) {
        return failureResponse(res, error_invalid_registration_data, 400);
    }

    try {
        const result = await registerUser(username, login, password);
        successResponse(res, success_user_registered, result.data, result.status);
    } catch (err) {
        failureResponse(res, error_registration, 500, err);
    }
};

export const loginAccount = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return failureResponse(res, error_invalid_login_data, 400);
    }

    try {
        const result = await loginUser(login, password);
        successResponse(res,  success_login, result.data, result.status);
    } catch (err) {
        failureResponse(res, error_login, 500, err);
    }
};

export const fetchUsername = async (req: Request, res: Response) => {
    const login = req.query.login as string;

    if (!login) {
        return failureResponse(res, error_login_not_provided, 400);
    }

    try {
        const result = await getUsername(login);
        successResponse(res, success_username_found, result.data, result.status);
    } catch (err) {
        failureResponse(res, error_fetch_username, 500, err);
    }
};
