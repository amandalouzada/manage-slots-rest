import { Response as ExpressResponse } from 'express';
export class ControllerResponse {

  public static ok(res: ExpressResponse, data: any): ExpressResponse {
    if (data) {
      return res.status(200).json(data);
    }
    return res.sendStatus(200);
  }

  public static created(res: ExpressResponse, data?: any): ExpressResponse {
    if (data) {
      return res.status(201).json(data);
    }
    return res.sendStatus(201);
  }

  public static jsonResponse(
    response: ExpressResponse,
    code: number,
    message: string
  ): ExpressResponse {
    return response.status(code).json({ message });
  }

  public static unauthorized(res: ExpressResponse, message?: string): ExpressResponse {
    return ControllerResponse.jsonResponse(
      res,
      400,
      message || 'Unauthorized'
    );
  }

  public static notFound(res: ExpressResponse, message?: string): ExpressResponse {
    return ControllerResponse.jsonResponse(
      res,
      400,
      message || 'Not found'
    );
  }
}