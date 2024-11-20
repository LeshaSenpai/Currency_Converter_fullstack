import { Request, Response } from 'express';
import { fetchAllCurrencies } from '../services/currencyService';
import { successResponse, failureResponse } from '../utils/responseHelper';
import { error_currency_fetch, success_currency_fetch } from '../constant';

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        const currencies = await fetchAllCurrencies();
        successResponse(res, success_currency_fetch, currencies);
    } catch (err) {
        failureResponse(res, error_currency_fetch, 500, err);
    }
};
