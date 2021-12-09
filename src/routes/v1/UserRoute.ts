import { Router } from 'express';

import { authenticationMiddleware } from '../../middleware';
import { getCurrentUser, getUser } from '../../controller/user.controller';
import { getUserRequest } from '../../middleware/userRouteMiddleware';

const router = Router();

router.get('/', [authenticationMiddleware], getCurrentUser);
router.get('/users', [authenticationMiddleware, getUserRequest], getUser);


export default router