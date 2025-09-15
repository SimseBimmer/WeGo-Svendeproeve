import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/bagsizeController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:id', getRecord);

export const bagSizeRoutes = routes;