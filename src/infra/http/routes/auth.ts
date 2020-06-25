import express from 'express';
import { authController } from '@modules/auth';

const AuthRoutes = express.Router();

AuthRoutes.post('/login', authController.loginProfessional);

export default AuthRoutes;