import express from 'express';
import { customerController } from '@modules/customer';

const CustomerRoutes = express.Router();

CustomerRoutes.post('/', customerController.createCustomerAndUser);

export default CustomerRoutes;