import { Request, Response } from "express";
import { ProfessionalService } from "@modules/professional/ProfessionalService";
import { ProfessionalUser } from "@modules/professional/ProfessionalUser";
import { JWT } from "./JWT";

export class AuthController {

  constructor(private professionalService: ProfessionalService) {

  }

  loginProfessional = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const professionalUser = await this.professionalService.getByEmail(email);
    if (professionalUser.user.password.comparePassword(password)) {
      const jwt = JWT.create({
        sub: professionalUser.id
      }, {
        email: professionalUser.user.email.value,
        name: professionalUser.user.name,
      });
      professionalUser.user.setAccessToken(jwt.token);
    }


    res.json({ accessToken: professionalUser.user.accessToken })
  }
}