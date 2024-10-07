import Account from '../models/Account';

export const registerUser = async (username: string, login: string, password: string) => {
    const existingAccount = await Account.findOne({ where: { login } });

    if (existingAccount) {
        return { status: 400, data: { error: 'Логин уже используется' } };
    }

    const newUser = await Account.create({ username, login, password });
    return { status: 201, data: { message: 'Пользователь зарегистрирован', user: newUser } };
};

export const loginUser = async (login: string, password: string) => {
    const account = await Account.findOne({ where: { login, password } });

    if (!account) {
        return { status: 401, data: { error: 'Неправильный логин или пароль' } };
    }

    return { status: 200, data: { message: 'Авторизация успешна' } };
};

export const getUsername = async (login: string) => {
    const account = await Account.findOne({ where: { login } });

    if (!account) {
        return { status: 404, data: { error: 'Пользователь не найден' } };
    }

    return { status: 200, data: { username: account.username } };
};
