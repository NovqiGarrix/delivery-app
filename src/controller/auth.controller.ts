import { Request, Response } from 'express';
import authService from '../service/auth.service';

import sendHTTPError from '../util/sendError';
import { ReqBodyLogin, ReqBodyRegister } from '../middleware/authRouteMiddeware'
import { UserType } from '../model/user.model';


export const login = async (req: Request<{}, {}, ReqBodyLogin>, res: Response): Promise<Response> => {

    try {

        return await authService.login(res, req, req.body);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export const register = async (req: Request<{}, {}, ReqBodyRegister>, res: Response): Promise<Response> => {

    try {

        const user = await authService.findOne({ email: req.body.email }, { email: 1 });
        if (user) return sendHTTPError(res, 'Account created!', 200);

        await authService.register({ ...req.body, type: req.body.type as UserType });
        return res.sendStatus(201);

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}