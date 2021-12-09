import { Router } from 'express';

import { addOrder, getOrders, getOrder, updateStatus, signOrder, setFinishedDishes, getOrderByChefId } from '../../controller/order.controller';
import { addOrderRequest, setFinishedDishesRequest, updateStatusRequest } from '../../middleware/orderRouteMiddleware';

const router = Router();

router.post('/', [addOrderRequest], addOrder);
router.post('/:orderId/sign', signOrder)
router.post('/:orderId/updateStatus', [updateStatusRequest], updateStatus);
router.post('/:orderId/finishedDishes', [setFinishedDishesRequest], setFinishedDishes);

router.get('/', getOrders);
router.get('/byChef', getOrderByChefId);
router.get('/:orderId/one', getOrder);

export default router