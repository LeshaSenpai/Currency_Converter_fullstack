import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import { currencyStore } from '../../stores/CurrencyStore';
import './Registration.css';

const Registration = observer(() => {
    const [username, setUsername] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { error, successMessage, registerUser } = currencyStore;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        registerUser(username, login, password);
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-group">
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        maxLength={20}
                        placeholder="Введите имя пользователя"
                    />
                </div>
                <div className="form-group">
                    <label>Логин</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        maxLength={20}
                        placeholder="Введите логин"
                    />
                </div>
                <div className="form-group">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={38}
                        placeholder="Введите пароль"
                    />
                </div>
                <button type="submit" className = "button-for-registration">Зарегистрироваться</button>
                <span className = "Home-link"><Link to="/">На главную</Link></span>
            </form>
        </div>
    );
});

export {Registration};
