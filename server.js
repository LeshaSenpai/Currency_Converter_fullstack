const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelizeCurrencies, sequelizeAccounts } = require('./database');
const Currency = require('./models/Currency'); 
const Account = require('./models/Account');  

const app = express();
app.use(cors());
app.use(bodyParser.json());

sequelizeCurrencies.authenticate().then(() => sequelizeCurrencies.sync());
sequelizeAccounts.authenticate().then(() => sequelizeAccounts.sync());

app.post('/accounts', async (req, res) => {
    const { username, login, password } = req.body;

    if (!username || !login || !password) {
        return res.status(400).json({ error: 'Неправильные данные для регистрации' });
    }

    try {
        const existingAccount = await Account.findOne({ where: { login } });

        if (existingAccount) {
            return res.status(400).json({ error: 'Логин уже используется' });
        }

        const newUser = await Account.create({ username, login, password });
        res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при регистрации' });
    }
});

app.get("/currencies", async (req, res) => {
    try {
        const currencies = await Currency.findAll(); 

        const initialItems = currencies.map(row => ({
            text: row.text,
            symbol: row.symbol,
            code: row.code,
            currencyCode: row.currencycode,
            rate: parseFloat(row.rates)
        }));

        res.json(initialItems);
    } catch (err) {
        res.status(500).json({ error: "Ошибка при получении данных с базы" });
    }
});
app.post('/accounts/login', async (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Неправильные данные для авторизации' });
    }

    try {
        const account = await Account.findOne({ where: { login, password } });

        if (!account) {
            return res.status(401).json({ error: 'Неправильный логин или пароль' });
        }

        res.status(200).json({ message: 'Авторизация успешна' });
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при авторизации' });
    }
});
app.get('/getUsername', async (req, res) => {
    const { login } = req.query;

    try {
        const account = await Account.findOne({ where: { login } });

        if (account) {
            res.json({ username: account.username });
        } else {
            res.status(404).json({ error: 'Пользователь не найден' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

app.listen(5000, () => {
    console.log("Сервер запущен на порту 5000");
});
