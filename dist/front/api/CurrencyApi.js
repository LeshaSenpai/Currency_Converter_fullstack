"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavorite = exports.getUsername = exports.loginUserApi = exports.registerUserApi = exports.fetchCurrencyData = void 0;
const backendUrl = "http://localhost:5000";
async function fetchCurrencyData() {
    try {
        const response = await fetch(`${backendUrl}/currencies`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных о валютах");
        }
        const data = await response.json();
        return data.data;
    }
    catch (error) {
        throw new Error("Ошибка при получении данных с бэкенда");
    }
}
exports.fetchCurrencyData = fetchCurrencyData;
async function registerUserApi(username, login, password) {
    try {
        const response = await fetch(`${backendUrl}/accounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, login, password }),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        return { success: false, message: 'Ошибка при регистрации' };
    }
}
exports.registerUserApi = registerUserApi;
async function loginUserApi(login, password) {
    try {
        const response = await fetch(`${backendUrl}/accounts/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        });
        const data = await response.json();
        return data;
    }
    catch (error) {
        return { success: false, message: 'Ошибка при авторизации' };
    }
}
exports.loginUserApi = loginUserApi;
async function getUsername(login) {
    try {
        const response = await fetch(`${backendUrl}/getUsername?login=${login}`);
        const data = await response.json();
        if (response.ok) {
            return { success: true, data: data.data };
        }
        else {
            return { success: false, error: data.error || 'Ошибка получения имени пользователя' };
        }
    }
    catch (error) {
        return { success: false, error: 'Ошибка сети' };
    }
}
exports.getUsername = getUsername;
async function getFavorite() {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}
exports.getFavorite = getFavorite;
async function addFavorite(favoriteCode) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify([...favorites, favoriteCode]));
}
exports.addFavorite = addFavorite;
async function removeFavorite(favoriteCode) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify(favorites.filter(item => item !== favoriteCode)));
}
exports.removeFavorite = removeFavorite;
