import { Request, Response, NextFunction } from 'express';

import { z, number, object } from 'zod';
import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    rating: number({ required_error: "Do not forget to pass the new rating!" })
})

export type AddRatingReqBody = z.infer<typeof reqBody>;

const addRatingRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validBody = reqBody.safeParse(req.body);

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);
        return sendHTTPError(res, error, 406);
    }

    return next();

}

export default addRatingRequest