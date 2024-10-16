import { Request, Response } from 'express';
import { fetchAllCurrencies } from '../services/currencyService';
import { successResponse, failureResponse } from '../utils/responseHelper';
import { ERROR_CURRENCY_FETCH, SUCCESS_CURRENCY_FETCH } from '../constant';

export const getCurrencies = async (req: Request, res: Response) => {
    try {
        const currencies = await fetchAllCurrencies();
        successResponse(res, SUCCESS_CURRENCY_FETCH, currencies);
    } catch (err) {
        failureResponse(res, ERROR_CURRENCY_FETCH, 500, err);
    }
};
