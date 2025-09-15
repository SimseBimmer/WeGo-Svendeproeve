import { Router } from 'express';
import { Inspect } from '../controllers/devController';

const routes = Router();
routes.get('/', Inspect);

export const devRoutes = routes;