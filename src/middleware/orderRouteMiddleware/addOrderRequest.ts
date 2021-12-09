import { Request, Response, NextFunction } from 'express';
import { z, string, object, array } from 'zod';

import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    driverId: string({ required_error: "Do not forget to pass the driver ID!" }),
    dishesIds: array(string({ required_error: "Do not forget to pass the dishes Ids!" })),
    destination: string({ required_error: "Do not forget to pass the order's destination!" })
})

export type AddOrderReqBody = z.infer<typeof reqBody> & { userId: string }

const addOrderRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validBody = reqBody.safeParse(req.body);
    const userId = res.locals.user._id;

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);
        return sendHTTPError(res, error, 406);
    }

    req.body = { ...req.body, userId }
    return next();
}

export default addOrderRequest