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

export const fetchCurrencyData = async (): Promise<ItemType[]> => {
    try {
        const response = await fetch(`${backendUrl}/currencies`);
        if (!response.ok) {
            throw new Error("Ошибка при загрузке данных о валютах");
        }
        const data = await response.json();
        return data as ItemType[];
    } catch (error) {
        throw new Error("Ошибка при получении данных с бэкенда");
    }
};

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