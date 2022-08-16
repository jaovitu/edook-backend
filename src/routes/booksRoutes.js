import { Router } from 'express';

import BookController from '../app/controllers/BookController.js';
import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';

const router = Router();

router.post('/books', AuthMiddleware, BookController.store);

export default router;
