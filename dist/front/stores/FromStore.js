"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currencyStore = exports.accountInLocalStorage = void 0;
const mobx_1 = require("mobx");
const CurrencyApi_1 = require("../api/CurrencyApi");
exports.accountInLocalStorage = 'Account';
class CurrencyStore {
    constructor() {
        this.rates = null;
        this.items = [];
        this.favorite = [];
        this.loading = true;
        this.error = null;
        this.successMessage = null;
        this.account = localStorage.getItem(exports.accountInLocalStorage) || '';
        this.initializeData = async () => {
            if (this.account) {
                await this.getFavoriteData();
            }
            await this.loadCurrencyData();
        };
        this.loadCurrencyData = async () => {
            try {
                const data = await (0, CurrencyApi_1.fetchCurrencyData)();
                const rates = {};
                data.forEach((item) => {
                    rates[item.code] = item.rate;
                });
                (0, mobx_1.runInAction)(() => {
                    this.items = data.map((item) => ({
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
                const data = await (0, CurrencyApi_1.registerUserApi)(username, login, password);
                if (!data.success) {
                    throw new Error(data.message);
                }
                (0, mobx_1.runInAction)(() => {
                    this.successMessage = data.message;
                    this.account = login;
                    localStorage.setItem(exports.accountInLocalStorage, login);
                    localStorage.setItem(login, JSON.stringify([]));
                    this.updateItemsWithFavorites();
                    this.error = null;
                });
            }
            catch (err) {
                (0, mobx_1.runInAction)(() => {
                    this.error = err.message || 'Ошибка при отправке данных на сервер';
                    this.successMessage = null;
                });
            }
        };
        this.authoriseUser = async (login, password) => {
            try {
                const data = await (0, CurrencyApi_1.loginUserApi)(login, password);
                if (!data.success) {
                    throw new Error(data.message);
                }
                (0, mobx_1.runInAction)(() => {
                    this.successMessage = data.message;
                    this.account = login;
                    localStorage.setItem(exports.accountInLocalStorage, login);
                    this.getFavoriteData();
                    this.updateItemsWithFavorites();
                    this.error = null;
                });
            }
            catch (err) {
                (0, mobx_1.runInAction)(() => {
                    this.error = err.message || 'Ошибка при отправке данных на сервер';
                    this.successMessage = null;
                });
            }
        };
        this.getUsername = async () => {
            if (this.account) {
                try {
                    const response = await (0, CurrencyApi_1.getUsername)(this.account);
                    if (response.success && response.data) {
                        return response.data.username;
                    }
                }
                catch (error) {
                    return '';
                }
            }
            return '';
        };
        (0, mobx_1.makeAutoObservable)(this);
        this.initializeData();
    }
}
exports.currencyStore = new CurrencyStore();
