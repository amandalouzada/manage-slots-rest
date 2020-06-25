import { Request, Response } from "express";
import { ProfessionalService } from "@modules/professional/ProfessionalService";
import { ProfessionalUser } from "@modules/professional/ProfessionalUser";
import { JWT } from "./JWT";
import { IAuthService } from "./IAuthService";

export class AuthController {

  constructor(private authService: IAuthService) {

  }

  loginProfessional = async (req: Request, res: Response): Promise<any> => {
    try{
      const { email, password } = req.body;

      const professionalUser = await this.authService.getProfessionalUserByEmail(email);
      if (professionalUser.user.password.comparePassword(password)) {
        const jwt = JWT.create({
          sub: professionalUser.user.id
        }, {
          email: professionalUser.user.email.value,
          name: professionalUser.user.name,
          identity: 'ProfessionalIdentity'
        });
        professionalUser.user.setAccessToken(jwt.token);
        res.json({ accessToken: professionalUser.user.accessToken })
      }
  
     
    } catch(e){
      res.status(404).json({error:'invalid email or password'})
    }
    
  }

  loginCustomer = async (req: Request, res: Response): Promise<any> => {
    try{
      const { email, password } = req.body;
      const customerlUser = await this.authService.getCustomerUserByEmail(email);
      if (customerlUser.user.password.comparePassword(password)) {
        const jwt = JWT.create({
          sub: customerlUser.user.id
        }, {
          email: customerlUser.user.email.value,
          name: customerlUser.user.name,
          identity: 'ProfessionalIdentity'
        });
        customerlUser.user.setAccessToken(jwt.token);
  
        res.json({ accessToken: customerlUser.user.accessToken })
      }
  
    } catch(e){
      res.status(404).json({error:'invalid email or password'})
    }
    
  }
}