import { Request, Response, NextFunction } from 'express';

import { z, object, string } from 'zod';
import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    finishedDishesIds: z.array(string({ required_error: "Do not forget to pass the finished DishesId!" }))
})

export type SetFinishedDishesReqBody = z.infer<typeof reqBody>

const setFinishedDishesRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validBody = reqBody.safeParse(req.body);

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);
        return sendHTTPError(res, error, 406);
    }

    return next();

}

export default setFinishedDishesRequest