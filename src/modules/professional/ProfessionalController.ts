import { IProfessionalService } from "./IProfessionalService";
import { Request, Response } from "express";

export class ProfessionalController {

  constructor(private professionalService: IProfessionalService) {
    this.professionalService = professionalService;
  }

  createProfessionalAndUser = async (req: Request, res: Response): Promise<any> => {
    const { license, name, email, password } = req.body;
    const result = await this.professionalService.createProfessionalAndUser
      (
        { license },
        { name, email, password }
      );

    res.status(201).json({
      result
    });
  }


}
