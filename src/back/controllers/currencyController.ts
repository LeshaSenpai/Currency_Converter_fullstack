import { Request, Response } from 'express';
import { fetchAllCurrencies } from '../services/currencyService';
import { successResponse, failureResponse } from '../utils/responseHelper';

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        const currencies = await fetchAllCurrencies();
        successResponse(res, 'Данные о валютах успешно получены', currencies);
    } catch (err) {
        failureResponse(res, 'Ошибка при получении данных с базы', 500, err);
    }
};
