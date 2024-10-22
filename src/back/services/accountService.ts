import Account from '../models/Account';
import {
    error_login_already_used,
    success_user_registered,
    error_incorrect_login_password,
    success_login,
    error_user_not_found
} from '../constant';

export const registerUser = async (username: string, login: string, password: string) => {
    const existingAccount = await Account.findOne({ where: { login } });

    if (existingAccount) {
        return { status: 400, data: { error: error_login_already_used } };
    }

    const newUser = await Account.create({ username, login, password });
    return { status: 201, data: { message: success_user_registered, user: newUser } };
};

export const loginUser = async (login: string, password: string) => {
    const account = await Account.findOne({ where: { login, password } });

    if (!account) {
        return { status: 401, data: { error: error_incorrect_login_password } };
    }

    return { status: 200, data: { message: success_login } };
};

export const getUsername = async (login: string) => {
    const account = await Account.findOne({ where: { login } });

    if (!account) {
        return { status: 404, data: { error: error_user_not_found } };
    }

    return { status: 200, data: { username: account.username } };
};
