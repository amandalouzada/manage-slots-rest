
import dotenv from 'dotenv';
dotenv.config();

import db from '@infra/mongoose/config/MongoDB';
import expressServer from './ExpressServer';
import express from 'express';


const userRouter = express.Router();

userRouter.get('/',
  async (req, res) => {
    throw new Error('TESTE handler')
  }
)

expressServer.applyRoute('/user', userRouter);
db.initialize();
expressServer.initServer();


