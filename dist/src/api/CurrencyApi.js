"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCurrencyData = void 0;
exports.getFavorite = getFavorite;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
const backendUrl = "http://localhost:5000";
const fetchCurrencyData = async () => {
    try {
        const response = await fetch(`${backendUrl}/currencies`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных о валютах");
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        throw new Error("Ошибка при получении данных с бэкенда");
    }
};
exports.fetchCurrencyData = fetchCurrencyData;
async function getFavorite() {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}
async function addFavorite(favoriteCode) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify([...favorites, favoriteCode]));
}
async function removeFavorite(favoriteCode) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify(favorites.filter(item => item !== favoriteCode)));
}
