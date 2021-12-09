import { Request, Response, NextFunction } from 'express';

import validator from 'validator';
import { object, string, z } from 'zod';
import { createZodError } from '../../util/createZodError';
import sendHTTPError from '../../util/sendError';

// Pesan error ketika user tidak memasukkan input berikut saat register
// Bebas aja sih pesannya
const registerBody = object({
    name: string({ required_error: "Please provide a name to register new account!" }),
    email: string({ required_error: "Please provide a email to register new account!" }),
    password: string({ required_error: "Please provide a password to register new account!" }),
    type: string({ required_error: "Please provide a type to register new account!" })
});

export type ReqBodyRegister = z.infer<typeof registerBody>;
const registerRequest = (req: Request<{}, {}, ReqBodyRegister>, res: Response, next: NextFunction): Response | void => {

    const validBody = registerBody.safeParse(req.body);

    if (!validBody.success) {
        const error = createZodError(validBody.error.issues);

        // 406 adalah kode HTTP untuk "Unacceptable" atau request tidak diterima
        return sendHTTPError(res, error, 406);
    }

    const isEmail = validator.isEmail(req.body.email);
    if (!isEmail) return sendHTTPError(res, 'Invalid email!', 406);

    const isValidPassword = req.body.password.length > 8;
    if (!isValidPassword) return sendHTTPError(res, 'Password must have at least 8 characters!', 406);

    return next();

}

export default registerRequest