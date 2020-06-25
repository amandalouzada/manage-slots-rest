import { ICustomerService } from "./ICustomerService";
import { Request, Response } from "express";

export class CustomerController {

  constructor(private customerService: ICustomerService) {
    this.customerService = customerService;
  }

  createCustomerAndUser = async (req: Request, res: Response): Promise<any> => {
    const {name, email, password } = req.body;
    const result = await this.customerService.createCustomerAndUser
      (
        { name, email, password }
      );

    res.status(201).json({
      result
    });
  }


}
