import { Request, Response, NextFunction } from 'express';

import { z, object } from 'zod';
import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

const reqBody = object({
    status: z.enum(['pending', 'ongoing', 'finished', 'picked', 'delivered'])
})

export type UpdateStatusReqBody = z.infer<typeof reqBody>

const updateStatusRequest = (req: Request, res: Response, next: NextFunction): Response | void => {

    const validBody = reqBody.safeParse(req.body);

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);
        return sendHTTPError(res, error)
    }

    return next();

}

export default updateStatusRequest