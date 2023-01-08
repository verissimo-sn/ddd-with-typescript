import express from 'express';

import { create, findById } from './controllers'

export const customerRouter = express.Router();
customerRouter.post('/', create);
customerRouter.get('/:id', findById);