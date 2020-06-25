import { IProfessionalService } from "./IProfessionalService";
import IProfessionalRepository from "./IProfessionalRepository";
import { User } from "@modules/user/User";
import { UserEmail } from "@modules/user/UserEmail";
import { UserPassword } from "@modules/user/UserPassword";
import { ProfessionalUser } from "./ProfessionalUser";
import IUserRepository from "@modules/user/IUserRepository";

export class ProfessionalService implements IProfessionalService {

  constructor(private professionalRepository: IProfessionalRepository,
    private userRepository: IUserRepository
  ) {
    this.professionalRepository = professionalRepository;
    this.userRepository = userRepository;
  }

  async create(professional: { license: string; userId: string; }): Promise<any> {
    return this.professionalRepository.create(professional);
  }

  async createProfessionalAndUser(professional: { license: string; }, user: { name: string; email: string; password: string; }): Promise<any> {
    const professionalUser = ProfessionalUser.create({
      license: professional.license,
      user: User.create({
        name: user.name,
        email: UserEmail.create(user.email),
        password: UserPassword.create({ value: user.password })
      })
    });
    const newUser = await this.userRepository.create({
      name: professionalUser.user.name,
      email: professionalUser.user.email.value,
      password: await professionalUser.user.password.getHashedValue()
    });

    const newProfessional = await this.professionalRepository.create({
      license: professionalUser.license,
      userId: newUser.id
    });

    return newProfessional;

  }




}