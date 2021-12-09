import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';

import userService from './user.service';
import { User, UserReturn } from '../model/user.model';
import sendHTTPError from '../util/sendError';
import jwt from '../util/jwt';
import chefService from './chef.service';

const { findOne, createUser, findOneDatas } = userService

async function login(res: Response, req: Request, { email, password }: { email: string, password: string }) {

    const user = await findOneDatas({ email });
    if (!user) return sendHTTPError(res, 'Invalid email or password!', 403);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return sendHTTPError(res, 'Invalid email or password!', 403);

    const accessToken = jwt.signToken({ email }, { expiresIn: '15m' });
    const refreshToken = jwt.signToken({ email, _id: user._id }, { expiresIn: '1y' });

    const { password: _, ...rest } = user

    return res.send({ ...rest, accessToken, refreshToken });
}

async function register(newUser: Omit<User, '_id' | 'createdAt' | 'updatedAt' | 'role' | 'voted'>): Promise<UserReturn> {

    const hashPassword = await bcrypt.hash(newUser.password, 12);
    const user = await createUser({ ...newUser, password: hashPassword });

    switch (newUser.type) {
        case 'food-chef' || 'drink-chef':
            await chefService.addChef({ userId: user._id })
            break;

        default:
            break;
    }

    return user
}

export default { register, findOne, login }