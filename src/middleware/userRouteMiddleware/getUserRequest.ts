import { Request, Response, NextFunction } from 'express';
import { User } from '../../model/user.model';
import sendHTTPError from '../../util/sendError';

const getUserRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const { role } = res.locals.user as User
    if (role !== 3) return sendHTTPError(res, "Invalid request!", 406);

    const emptyQuery = Object.entries(req.query).length < 1
    if (emptyQuery) return sendHTTPError(res, 'Include some filter!', 406);

    return next();

}

export default getUserRequest