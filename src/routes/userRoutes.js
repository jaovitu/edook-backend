import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';
import AuthController from '../app/controllers/AuthController.js';
import AuthMiddleware from '../middlewares/AuthMiddleware.js';

const router = Router();

// Private routes
router.get('/users/:id', AuthMiddleware, UserController.show);

// Public routes
router.post('/users', UserController.store);
router.post('/auth', AuthController.authenticate);

export default router;
