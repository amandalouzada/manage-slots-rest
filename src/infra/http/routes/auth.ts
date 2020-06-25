import express from 'express';
import { authController } from '@modules/auth';

const AuthRoutes = express.Router();

AuthRoutes.post('/loginProfessional', authController.loginProfessional);
AuthRoutes.post('/login', authController.loginCustomer);

export default AuthRoutes;