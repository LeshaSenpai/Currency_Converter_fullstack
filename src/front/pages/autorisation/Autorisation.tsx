import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from "react-router-dom";
import { currencyStore } from '../../stores/FromStore'; 
import './Autorisation.css'; 

const Autorisation = observer(() => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { error, successMessage, authoriseUser } = currencyStore; 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        authoriseUser(login, password); 
    };

    return (
        <div className="auth">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                {successMessage && <div className="success-message">{successMessage}</div>}
                <div className="form-group-for-auth">
                    <label>Логин</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        maxLength={20}
                        placeholder="Введите логин"
                    />
                </div>
                <div className="form-group-for-auth">
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        maxLength={38}
                        placeholder="Введите пароль"
                    />
                </div>
                <button type="submit" className="button-for-authorization">Войти</button>
                <span className = "Home-link"><Link to="/">На главную</Link></span>
            </form>
        </div>
    );
});

export { Autorisation };
