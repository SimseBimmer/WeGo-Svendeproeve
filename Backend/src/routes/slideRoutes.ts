import { Router } from 'express';
import { getRecords } from '../controllers/slideController';

const routes = Router();
routes.get('/', getRecords);

export const slideRoutes = routes;