
import dotenv from 'dotenv';
dotenv.config();

import db from '@infra/mongoose/config/MongoDB';
import expressServer from './ExpressServer';

import ProfessionalRoutes from './routes/professional';
import AuthRoutes from './routes/auth';
import SlotRoutes from './routes/slot';


expressServer.applyRoute('/professional', ProfessionalRoutes);
expressServer.applyRoute('/auth', AuthRoutes);
expressServer.applyRoute('/slots', SlotRoutes);
db.initialize();
expressServer.initServer();


