import express from 'express';
import { professionalController } from '@modules/professional';

const ProfessionalRoutes = express.Router();

ProfessionalRoutes.post('/', professionalController.createProfessionalAndUser);
ProfessionalRoutes.post('/login', professionalController.login);

export default ProfessionalRoutes;