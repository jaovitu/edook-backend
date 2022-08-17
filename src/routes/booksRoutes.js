import multer from 'multer';
import { Router } from 'express';

import BookController from '../app/controllers/BookController.js';
import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';

import multerConfig from '../config/multer.js';

const router = Router();

router.post('/books', AuthMiddleware, multer(multerConfig).single('image'), BookController.store);

export default router;
