import { Router } from 'express';
import { listProductsController } from './products.controller.js';

export const productsRouter = Router();
productsRouter.get('/', listProductsController);
