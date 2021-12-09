import { NextFunction, Request, Response } from 'express';

import z, { object, string } from 'zod';

import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    email: string({ required_error: "Please provide email to login!" }),
    password: string({ required_error: "Please provide password to login!" })
})

export type ReqBodyLogin = z.infer<typeof reqBody>
const loginRequest = (req: Request, res: Response, next: NextFunction): void | Response => {

    const validBody = reqBody.safeParse(req.body);

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);

        return sendHTTPError(res, error);
    }

    return next();

}

export default loginRequest