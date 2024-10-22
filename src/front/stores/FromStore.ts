import { makeAutoObservable, runInAction } from "mobx";
import { ItemType, fetchCurrencyData, registerUserApi, loginUserApi, getUsername } from "../api/CurrencyApi";
import { SuccessResponse, FailureResponse } from "../api/ResponseInterfaces";

export type RawRatesType = {
    [key: string]: number;
};
export const accountInLocalStorage= 'Account';

class CurrencyStore {
    rates: RawRatesType | null = null;
    items: ItemType[] = [];
    favorite: string[] = [];
    loading: boolean = true;
    error: string | null = null;
    successMessage: string | null = null;
    account: string | null = localStorage.getItem(accountInLocalStorage) || '';

    constructor() {
        makeAutoObservable(this);
        this.initializeData();
    }

    initializeData = async () => {
        if (this.account) {
            await this.getFavoriteData();
        }
        await this.loadCurrencyData();
    }

    loadCurrencyData = async () => {
        try {
            const data = await fetchCurrencyData();
            const rates: RawRatesType = {};
            data.forEach((item: ItemType) => {
                rates[item.code] = item.rate;
            });

            runInAction(() => {
                this.items = data.map((item: ItemType) => ({
                    ...item,
                    isFavorite: this.favorite.includes(item.code),
                })).sort(this.sortByFavorite);
                this.rates = rates;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = "Ошибка загрузки данных";
                this.loading = false;
            });
        }
    }

    getFavoriteData = async () => {
        const savedFavorites = localStorage.getItem(this.account || '');
        runInAction(() => {
            this.favorite = savedFavorites ? JSON.parse(savedFavorites) : [];
        });
    }

    addToFavorite = async (favoriteCode: string) => {
        const favorites = [...this.favorite]; 
        if (!favorites.includes(favoriteCode)) {
            favorites.push(favoriteCode);
            localStorage.setItem(this.account || '', JSON.stringify(favorites));
            runInAction(() => {
                this.favorite = favorites;
            });
            await this.updateItemsWithFavorites(); 
        }
    }

    removeFromFavorite = async (favoriteCode: string) => {
        const favorites = this.favorite.filter(item => item !== favoriteCode);
        localStorage.setItem(this.account || '', JSON.stringify(favorites));
        runInAction(() => {
            this.favorite = favorites;
        });
        await this.updateItemsWithFavorites(); 
    }

    toggleFavorite = (code: string) => {
        if (this.favorite.includes(code)) {
            this.removeFromFavorite(code);
        } else {
            this.addToFavorite(code);
        }
    }

    updateItemsWithFavorites = async () => {
        await this.getFavoriteData();
        runInAction(() => {
            this.items = this.items.map((item) => ({
                ...item,
                isFavorite: this.favorite.includes(item.code),
            })).sort(this.sortByFavorite);
        });
    }

    sortByFavorite = (a: ItemType, b: ItemType) => {
        if (a.isFavorite === b.isFavorite) {
            return 0;
        }
        return a.isFavorite ? -1 : 1;
    }

    registerUser = async (username: string, login: string, password: string) => {
        try {
            const data: SuccessResponse<any> | FailureResponse = await registerUserApi(username, login, password);

            if (!data.success) {
                throw new Error(data.message);
            }

            runInAction(() => {
                this.successMessage = data.message;
                this.account = login;
                localStorage.setItem(accountInLocalStorage, login);
                localStorage.setItem(login, JSON.stringify([]));
                this.updateItemsWithFavorites();
                this.error = null;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || 'Ошибка при отправке данных на сервер';
                this.successMessage = null;
            });
        }
    }

    authoriseUser = async (login: string, password: string) => {
        try {
            const data: SuccessResponse<any> | FailureResponse = await loginUserApi(login, password);

            if (!data.success) {
                throw new Error(data.message);
            }

            runInAction(() => {
                this.successMessage = data.message;
                this.account = login;
                localStorage.setItem(accountInLocalStorage, login);
                this.getFavoriteData();
                this.updateItemsWithFavorites();
                this.error = null;
            });
        } catch (err: any) {
            runInAction(() => {
                this.error = err.message || 'Ошибка при отправке данных на сервер';
                this.successMessage = null;
            });
        }
    }

    getUsername = async () => {
        if (this.account) {
            try {
                const response = await getUsername(this.account);
                if (response.success && response.data) {
                    return response.data.username;
                }
            } catch (error) {
                return '';
            }
        }
        return '';
    }
}

export const currencyStore = new CurrencyStore();
