const backendUrl = "http://localhost:5000";

export type ItemType = {
    text: string;
    symbol: string;
    code: string;
    currencyCode: string;
    rate: number;
    isFavorite: boolean;
    buttonClass: string;
};

export async function fetchCurrencyData(): Promise<ItemType[]> {
    try {
        const response = await fetch(`${backendUrl}/currencies`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных о валютах");
        }
        const data = await response.json();
        return data.data as ItemType[]; 
    } catch (error) {
        throw new Error("Ошибка при получении данных с бэкенда");
    }
}

export async function registerUserApi(username: string, login: string, password: string) {
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
    } catch (error) {
        return { success: false, message: 'Ошибка при регистрации' };
    }
}

export async function loginUserApi(login: string, password: string) {
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
    } catch (error) {
        return { success: false, message: 'Ошибка при авторизации' };
    }
}

export async function getUsername(login: string): Promise<{ success: boolean, data?: { username: string }, error?: string }> {
    try {
        const response = await fetch(`${backendUrl}/getUsername?login=${login}`);
        const data = await response.json();

        if (response.ok) {
            return { success: true, data: data.data };
        } else {
            return { success: false, error: data.error || 'Ошибка получения имени пользователя' };
        }
    } catch (error) {
        return { success: false, error: 'Ошибка сети' };
    }
}

export async function getFavorite(): Promise<string[]> {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
}

export async function addFavorite(favoriteCode: string) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify([...favorites, favoriteCode]));
}

export async function removeFavorite(favoriteCode: string) {
    const favorites = await getFavorite();
    localStorage.setItem("favorites", JSON.stringify(favorites.filter(item => item !== favoriteCode)));
}
