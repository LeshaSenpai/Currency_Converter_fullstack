import { makeAutoObservable, runInAction } from "mobx";

export type RawRatesType = {
    [key: string]: number;
};

class CurrencyStore {
    rates: RawRatesType | null = null;
    items: any[] = [];
    favorite: string[] = [];
    loading: boolean = true;
    error: string | null = null;
    successMessage: string | null = null;
    account: string | null = localStorage.getItem('Account') || '';

    constructor() {
        makeAutoObservable(this);
        this.initializeData();
    }

    initializeData = async () => {
        if (this.account) {
            await this.getFavoriteData();
        }
        await this.fetchCurrencyData();
    }

    fetchCurrencyData = async () => {
        try {
            const response = await fetch('http://localhost:5000/currencies');
            const currencyData = await response.json();
            const rates: RawRatesType = {};

            currencyData.forEach((item: any) => {
                rates[item.code] = item.rate;
            });

            runInAction(() => {
                this.items = currencyData.map((item: any) => ({
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

    sortByFavorite = (a: any, b: any) => {
        if (a.isFavorite === b.isFavorite) {
            return 0;
        }
        return a.isFavorite ? -1 : 1;
    }

    registerUser = async (username: string, login: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/accounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, login, password }),
            });

            const data = await response.json();

            runInAction(() => {
                if (response.ok) {
                    this.successMessage = 'Регистрация успешна';
                    this.account = login;
                    localStorage.setItem('Account', login);
                    localStorage.setItem(login, JSON.stringify([]));
                    this.updateItemsWithFavorites();
                } else {
                    this.error = data.error || 'Ошибка регистрации';
                    this.successMessage = null;
                }
            });
        } catch (err) {
            runInAction(() => {
                this.error = 'Ошибка при отправке данных на сервер';
                this.successMessage = null;
            });
        }
    }

    authoriseUser = async (login: string, password: string) => {
        try {
            const response = await fetch('http://localhost:5000/accounts/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password }),
            });

            const data = await response.json();

            runInAction(() => {
                if (response.ok) {
                    this.successMessage = 'Авторизация успешна';
                    this.account = login;
                    localStorage.setItem('Account', login);
                    this.getFavoriteData();
                    this.updateItemsWithFavorites();
                } else {
                    this.error = data.error || 'Ошибка авторизации';
                    this.successMessage = null;
                }
            });
        } catch (err) {
            runInAction(() => {
                this.error = 'Ошибка при отправке данных на сервер';
                this.successMessage = null;
            });
        }
    }
}

export const currencyStore = new CurrencyStore();
