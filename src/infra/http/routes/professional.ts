import express from 'express';
import { professionalController } from '@modules/professional';
import { professionalMiddleware } from '@modules/auth/authMiddlewares';

const ProfessionalRoutes = express.Router();

ProfessionalRoutes.post('/', professionalController.createProfessionalAndUser);

export default ProfessionalRoutes;