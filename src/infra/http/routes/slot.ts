import express from 'express';
import { slotController } from '@modules/slots';
import { professionalMiddleware, customerMiddleware } from '@modules/auth/authMiddlewares';

const SlotRoutes = express.Router();

SlotRoutes.post('/', professionalMiddleware, slotController.createMany);
SlotRoutes.get('/', slotController.list);
SlotRoutes.post('/booksASession', customerMiddleware, slotController.booksASeesion);

export default SlotRoutes;