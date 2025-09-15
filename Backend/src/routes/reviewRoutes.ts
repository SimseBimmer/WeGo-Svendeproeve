import { Router } from 'express';
import { Authorize } from '../middleware/authMiddleware';
import { createRecord, deleteRecord, getRecord, getRecords, getRecordsByUserId, updateRecord } from '../controllers/reviewController';

const routes = Router();
routes.get('/', Authorize, getRecords);
routes.get('/byUser/:userId', getRecordsByUserId);
routes.get('/byId/:id', getRecord);
routes.post('/', Authorize, createRecord);
routes.put('/:id', Authorize, updateRecord);
routes.delete('/:id', Authorize, deleteRecord);

export const reviewRoutes = routes;