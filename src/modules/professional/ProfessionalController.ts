import { IProfessionalService } from "./IProfessionalService";
import { Request, Response } from "express";
import { UserPassword } from "@modules/user/UserPassword";

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

  login = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const professionaUser = await this.professionalService.getByEmail(email);

    res.status(201).json({
      user: professionaUser
    });
  }
}
