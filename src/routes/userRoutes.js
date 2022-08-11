import { Router } from 'express';

import UserController from '../app/controllers/UserController.js';

const router = Router();

router.get('/users/:id', UserController.show);

// Public routes
router.post('/users', UserController.store);

export default router;
