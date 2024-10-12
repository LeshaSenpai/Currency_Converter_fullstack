import { Request, Response } from 'express';
import { registerUser, loginUser, getUsername } from '../services/accountService';
import { successResponse, failureResponse } from '../utils/responseHelper';

export const registerAccount = async (req: Request, res: Response) => {
    const { username, login, password } = req.body;

    if (!username || !login || !password) {
        return failureResponse(res, 'Неправильные данные для регистрации', 400);
    }

    try {
        const result = await registerUser(username, login, password);
        successResponse(res, 'Пользователь успешно зарегистрирован', result.data, result.status);
    } catch (err) {
        failureResponse(res, 'Ошибка при регистрации', 500, err);
    }
};

export const loginAccount = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return failureResponse(res, 'Неправильные данные для авторизации', 400);
    }

    try {
        const result = await loginUser(login, password);
        successResponse(res, 'Авторизация успешна', result.data, result.status);
    } catch (err) {
        failureResponse(res, 'Ошибка при авторизации', 500, err);
    }
};

export const fetchUsername = async (req: Request, res: Response) => {
    const login = req.query.login as string;

    if (!login) {
        return failureResponse(res, 'Логин не указан', 400);
    }

    try {
        const result = await getUsername(login);
        successResponse(res, 'Имя пользователя найдено', result.data, result.status);
    } catch (err) {
        failureResponse(res, 'Ошибка при получении данных', 500, err);
    }
};
