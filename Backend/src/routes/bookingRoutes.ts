import { Router } from 'express';
import { Authorize } from '../middleware/authMiddleware';
import { createRecord, deleteRecord, getRecord, getRecords, getRecordsByUserId } from '../controllers/bookingController';

const routes = Router();
routes.get('/', getRecords);
routes.get('/byId/:id', getRecord);
routes.get('/byUser', Authorize, getRecordsByUserId);
routes.post('/', Authorize, createRecord);
routes.delete('/:id', Authorize, deleteRecord);

export const bookingRoutes = routes;