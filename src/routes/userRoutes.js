import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';
import AuthController from '../app/controllers/AuthController.js';

const router = Router();

router.get('/users/:id', UserController.show);

// Public routes
router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

export default router;
