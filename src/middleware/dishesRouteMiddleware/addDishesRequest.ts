import { Request, Response, NextFunction } from 'express';

import { number, string, object, z } from 'zod';
import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    name: string({ required_error: "Please provide a name for a dishes!" }),
    price: number({ required_error: "Please provide a price for a dishes!" }),
    category: z.enum(['food', 'drink'])
})

export type DishesReqBody = z.infer<typeof reqBody>
const addDishesRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validBody = reqBody.safeParse(req.body);
    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);
        return sendHTTPError(res, error, 406);
    }

    return next();

}

export default addDishesRequest