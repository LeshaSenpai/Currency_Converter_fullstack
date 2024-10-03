import { Request, Response } from 'express';
import { registerUser, loginUser, getUsername } from '../services/accountService';

export const registerAccount = async (req: Request, res: Response) => {
    const { username, login, password } = req.body;

    if (!username || !login || !password) {
        return res.status(400).json({ error: 'Неправильные данные для регистрации' });
    }

    try {
        const result = await registerUser(username, login, password);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
};

export const loginAccount = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Неправильные данные для авторизации' });
    }

    try {
        const result = await loginUser(login, password);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
};


export const fetchUsername = async (req: Request, res: Response) => {
    const login = req.query.login as string;

    try {
        const result = await getUsername(login);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
};
