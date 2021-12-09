import { Request, Response } from 'express';
import { UserReturn } from '../model/user.model';

import userService from '../service/user.service';
import sendHTTPError from '../util/sendError';

export const getCurrentUser = async (req: Request, res: Response): Promise<Response> => {

    const user = res.locals.user
    const newAccessToken = res.locals.newAccessToken

    const { password, ...rest } = user

    try {

        const response = {
            data: rest,
            newAccessToken,
            error: null
        }
        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {

    const newAccessToken = res.locals.newAccessToken

    try {

        const user = await userService.finds(req.query);

        const response = {
            data: user,
            newAccessToken,
            error: null
        }
        return res.send(response);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}