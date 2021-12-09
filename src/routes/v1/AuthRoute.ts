import { Router } from 'express';

import { login, register } from '../../controller/auth.controller';
import { loginRequestParse, registerRequestParse } from '../../middleware/authRouteMiddeware';

const router = Router();

router.post('/', [loginRequestParse], login);
router.post('/signUp', [registerRequestParse], register);

export default router