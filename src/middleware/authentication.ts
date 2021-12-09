import { NextFunction, Request, Response } from 'express';
import userService from '../service/user.service';
import jwt from '../util/jwt';

import sendHTTPError from '../util/sendError';

const authentication = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {

    const accessToken = req.headers['x-access-token']! as string
    const refreshToken = req.headers['x-refresh-token']! as string

    if (!accessToken) return sendHTTPError(res, 'Unauthorized!', 401);

    try {

        const { data, valid, message: jwtMessage } = jwt.verifyToken<{ email: string }>(accessToken);

        if (!(data && valid)) {
            if (jwtMessage !== "EXPIRED!") return sendHTTPError(res, 'Unauthorized!', 401);

            const { data: refreshData, valid: refreshValid } = jwt.verifyToken<{ email: string }>(refreshToken);

            if (!(refreshData && refreshValid)) return sendHTTPError(res, 'Unauthorized!', 401);

            const newAccessToken = await userService.reIssueAccessToken(refreshData.email);
            if (newAccessToken === "ERROR!") return sendHTTPError(res, 'Unauthorized!', 401);

            res.locals.newAccessToken = newAccessToken

            const currentUser = await userService.findOne({ email: refreshData.email });
            if (!currentUser) return sendHTTPError(res, 'Unauthorized!', 401);
            res.locals.user = currentUser

            return next();
        }

        const currentUser = await userService.findOne({ email: data.email });
        if (!currentUser) return sendHTTPError(res, 'Unauthorized!', 401);

        res.locals.user = currentUser
        return next();

    } catch (error: any) {
        return sendHTTPError(res, error.message);
    }
}

export default authentication