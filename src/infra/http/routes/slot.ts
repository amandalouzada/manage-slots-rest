import express from 'express';
import { slotController } from '@modules/slots';

const SlotRoutes = express.Router();

SlotRoutes.post('/', slotController.createMany);
SlotRoutes.get('/', slotController.list);

export default SlotRoutes;