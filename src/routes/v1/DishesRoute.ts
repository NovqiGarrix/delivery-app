import { Router } from 'express';

import { addDishes, addRating, getDishes, getDishess, searchDishes } from '../../controller/dishes.controller';
import { addDishesRequest } from '../../middleware/dishesRouteMiddleware';
import { addRatingRequest } from '../../middleware/dishesRouteMiddleware';


const router = Router();

router.post('/', [addDishesRequest], addDishes);
router.get('/', getDishess);
router.get('/search', searchDishes);
router.get('/:dishesId/one', getDishes);

router.post('/:dishesId/rate', [addRatingRequest], addRating);

export default router