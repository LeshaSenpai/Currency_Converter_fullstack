import Account from '../models/Account';
import {
    ERROR_LOGIN_ALREADY_USED,
    SUCCESS_USER_REGISTERED,
    ERROR_INCORRECT_LOGIN_PASSWORD,
    SUCCESS_LOGIN,
    ERROR_USER_NOT_FOUND
} from '../constant';

export const registerUser = async (username: string, login: string, password: string) => {
    const existingAccount = await Account.findOne({ where: { login } });

    if (existingAccount) {
        return { status: 400, data: { error: ERROR_LOGIN_ALREADY_USED } };
    }

    const newUser = await Account.create({ username, login, password });
    return { status: 201, data: { message: SUCCESS_USER_REGISTERED, user: newUser } };
};

export const loginUser = async (login: string, password: string) => {
    const account = await Account.findOne({ where: { login, password } });

    if (!account) {
        return { status: 401, data: { error: ERROR_INCORRECT_LOGIN_PASSWORD } };
    }

    return { status: 200, data: { message: SUCCESS_LOGIN } };
};

export const getUsername = async (login: string) => {
    const account = await Account.findOne({ where: { login } });

    if (!account) {
        return { status: 404, data: { error: ERROR_USER_NOT_FOUND } };
    }

    return { status: 200, data: { username: account.username } };
};
