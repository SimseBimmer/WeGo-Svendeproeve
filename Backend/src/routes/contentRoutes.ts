import { Router } from 'express';
import { getRecord, getRecords } from '../controllers/contentController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/:id', getRecord);

export const contentRoutes = routes;