import { Router } from 'express';

import AuthRoute from './AuthRoute';
import UserRoute from './UserRoute';
import DishesRoute from './DishesRoute';
import OrderRoute from './OrderRoute';

import { authenticationMiddleware } from '../../middleware';

const router = Router();

router.use('/auth', AuthRoute);

router.use('/user', authenticationMiddleware, UserRoute);
router.use('/dishes', authenticationMiddleware, DishesRoute);
router.use('/order', authenticationMiddleware, OrderRoute);

export default router