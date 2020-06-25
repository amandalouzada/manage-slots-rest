

import cors from 'cors';
import express, { NextFunction, Response, Request, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { Server } from 'http';
import 'express-async-errors';
// @ts-ignore
import Youch from 'youch';
export default new class ExpressServer {

  private server: express.Express
  private http: Server

  public constructor() {
    this.server = express();
    this.http = new Server(this.server);


    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(helmet());

    this.server.use(express.json());

    this.server.use(cors());

  }

  private routes() {
    this.server.get('/', (req, res) => {
      res.type('text/plain');
      res.send(process.env.APP_NAME);
    });

  }

  private exceptionHandler() {
    this.server.use(async (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {


      if (process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'test') {
        const errors = await new Youch(err, req).toHTML();
        delete errors.error.frames;
        res.status(500).json(errors);
        return;

      }

      const errors = await new Youch(err, req).toHTML();

      res.writeHead(200, { 'content-type': 'text/html' })
      res.write(errors)
      res.end()


      return;
    });
  }


  public initServer() {
    //handler errors
    this.exceptionHandler();

    //start http
    this.http.listen(process.env.APP_PORT, () => {
      console.log(`HTTP: start port ${process.env.APP_PORT}`);
    });


  }


  public closeServer() {
    this.http.close();
  }

  public applyRoute(routePath: string, route: express.Router) {
    this.server.use(routePath, route);
  }
};