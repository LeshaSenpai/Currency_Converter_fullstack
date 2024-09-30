"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyStore = void 0;
const mobx_1 = require("mobx");
class CurrencyStore {
    constructor() {
        this.rates = null;
        this.items = [];
        this.favorite = [];
        this.loading = true;
        this.error = null;
        this.successMessage = null;
        this.account = localStorage.getItem('Account') || '';
        this.initializeData = async () => {
            if (this.account) {
                await this.getFavoriteData();
            }
            await this.fetchCurrencyData();
        };
        this.fetchCurrencyData = async () => {
            try {
                const response = await fetch('http://localhost:5000/currencies');
                const currencyData = await response.json();
                const rates = {};
                currencyData.forEach((item) => {
                    rates[item.code] = item.rate;
                });
                (0, mobx_1.runInAction)(() => {
                    this.items = currencyData.map((item) => ({
                        ...item,
                        isFavorite: this.favorite.includes(item.code),
                    })).sort(this.sortByFavorite);
                    this.rates = rates;
                    this.loading = false;
                });
            }
            catch (error) {
                (0, mobx_1.runInAction)(() => {
                    this.error = "Ошибка загрузки данных";
                    this.loading = false;
                });
            }
        };
        this.getFavoriteData = async () => {
            const savedFavorites = localStorage.getItem(this.account || '');
            (0, mobx_1.runInAction)(() => {
                this.favorite = savedFavorites ? JSON.parse(savedFavorites) : [];
            });
        };
        this.addToFavorite = async (favoriteCode) => {
            const favorites = [...this.favorite];
            if (!favorites.includes(favoriteCode)) {
                favorites.push(favoriteCode);
                localStorage.setItem(this.account || '', JSON.stringify(favorites));
                (0, mobx_1.runInAction)(() => {
                    this.favorite = favorites;
                });
                await this.updateItemsWithFavorites();
            }
        };
        this.removeFromFavorite = async (favoriteCode) => {
            const favorites = this.favorite.filter(item => item !== favoriteCode);
            localStorage.setItem(this.account || '', JSON.stringify(favorites));
            (0, mobx_1.runInAction)(() => {
                this.favorite = favorites;
            });
            await this.updateItemsWithFavorites();
        };
        this.toggleFavorite = (code) => {
            if (this.favorite.includes(code)) {
                this.removeFromFavorite(code);
            }
            else {
                this.addToFavorite(code);
            }
        };
        this.updateItemsWithFavorites = async () => {
            await this.getFavoriteData();
            (0, mobx_1.runInAction)(() => {
                this.items = this.items.map((item) => ({
                    ...item,
                    isFavorite: this.favorite.includes(item.code),
                })).sort(this.sortByFavorite);
            });
        };
        this.sortByFavorite = (a, b) => {
            if (a.isFavorite === b.isFavorite) {
                return 0;
            }
            return a.isFavorite ? -1 : 1;
        };
        this.registerUser = async (username, login, password) => {
            try {
                const response = await fetch('http://localhost:5000/accounts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, login, password }),
                });
                const data = await response.json();
                (0, mobx_1.runInAction)(() => {
                    if (response.ok) {
                        this.successMessage = 'Регистрация успешна';
                        this.account = login;
                        localStorage.setItem('Account', login);
                        localStorage.setItem(login, JSON.stringify([]));
                        this.updateItemsWithFavorites();
                    }
                    else {
                        this.error = data.error || 'Ошибка регистрации';
                        this.successMessage = null;
                    }
                });
            }
            catch (err) {
                (0, mobx_1.runInAction)(() => {
                    this.error = 'Ошибка при отправке данных на сервер';
                    this.successMessage = null;
                });
            }
        };
        this.authoriseUser = async (login, password) => {
            try {
                const response = await fetch('http://localhost:5000/accounts/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ login, password }),
                });
                const data = await response.json();
                (0, mobx_1.runInAction)(() => {
                    if (response.ok) {
                        this.successMessage = 'Авторизация успешна';
                        this.account = login;
                        localStorage.setItem('Account', login);
                        this.getFavoriteData();
                        this.updateItemsWithFavorites();
                    }
                    else {
                        this.error = data.error || 'Ошибка авторизации';
                        this.successMessage = null;
                    }
                });
            }
            catch (err) {
                (0, mobx_1.runInAction)(() => {
                    this.error = 'Ошибка при отправке данных на сервер';
                    this.successMessage = null;
                });
            }
        };
        (0, mobx_1.makeAutoObservable)(this);
        this.initializeData();
    }
}
exports.currencyStore = new CurrencyStore();
