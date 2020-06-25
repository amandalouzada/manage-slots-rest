
import dotenv from 'dotenv';
dotenv.config();

import db from '@infra/mongoose/config/MongoDB';
import expressServer from './ExpressServer';

import ProfessionalRoutes from './routes/professional';
import AuthRoutes from './routes/auth';


expressServer.applyRoute('/professional', ProfessionalRoutes);
expressServer.applyRoute('/auth', AuthRoutes);
db.initialize();
expressServer.initServer();


