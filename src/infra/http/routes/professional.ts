import express from 'express';
import { professionalController } from '@modules/professional';

const ProfessionalRoutes = express.Router();

ProfessionalRoutes.post('/', professionalController.createProfessionalAndUser);

export default ProfessionalRoutes;