import { Request, Response } from 'express';
import { AddRatingReqBody, DishesReqBody } from '../middleware/dishesRouteMiddleware';
import { IDishes } from '../model/dishes.model';
import { User } from '../model/user.model';

import dishesService from '../service/dishes.service';
import sendHTTPError from '../util/sendError';

export const addDishes = async (req: Request<{}, {}, DishesReqBody>, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const existDishes = await dishesService.getDishes({ name: req.body.name, category: req.body.category }, { name: 1 });
        if (existDishes) return sendHTTPError(res, "This dishes was added!", 406);

        const dishes = await dishesService.addDishes(req.body);

        const response = {
            data: dishes,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getDishess = async (req: Request, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const dishes = await dishesService.getDishess({ ...req.query });

        const response = {
            data: dishes,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getDishes = async (req: Request<{ dishesId: string }>, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const dishes = await dishesService.getDishes({ _id: req.params.dishesId });

        const response = {
            data: dishes,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }

}

export const addRating = async (req: Request<{ dishesId: string }, {}, AddRatingReqBody>, res: Response): Promise<Response> => {

    const dishesId = req.params.dishesId
    const userId = res.locals.user._id;
    const { voted } = res.locals.user as User

    const newAccessToken = res.locals.newAccessToken

    const { rating } = req.body

    try {

        const isAlreadyVoted = voted.find((dishes) => dishes === dishesId);
        if (isAlreadyVoted) return res.sendStatus(200);

        const addedRating = await dishesService.addRating(dishesId, userId, rating);

        const response = {
            data: addedRating,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const searchDishes = async (req: Request<{}, {}, {}, { q: string }>, res: Response): Promise<Response> => {

    const { q: query } = req.query
    const newAccessToken = res.locals.newAccessToken

    try {

        if (!query) return getDishess(req, res);

        const dishes = await dishesService.searchDishes(query);

        const response = {
            data: dishes,
            newAccessToken,
            error: null
        }

        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}