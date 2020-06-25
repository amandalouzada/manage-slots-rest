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

  async getByEmail(email: string): Promise<ProfessionalUser> {
    const foundUser = await this.userRepository.getByEmail(email);
    const professional = await this.professionalRepository.findOne({ userId: foundUser.id });
    const userPassword = UserPassword.create({ value: professional.userId.password });
    const userEmail = UserEmail.create(professional.userId.email);
    const user = User.create({
      password: userPassword,
      email: userEmail,
      name: professional.userId.name
    });
    const professionaUser = ProfessionalUser.create({ license: professional.license, user, id: professional.id });
    return professionaUser;
  }

  async create(professional: { license: string; userId: string; }): Promise<any> {
    return this.professionalRepository.create(professional);
  }

  async createProfessionalAndUser(professional: { license: string; }, user: { name: string; email: string; password: string; }): Promise<any> {
    const professionaUser = ProfessionalUser.create({
      license: professional.license,
      user: User.create({
        name: user.name,
        email: UserEmail.create(user.email),
        password: UserPassword.create({ value: user.password })
      })
    });
    const newUser = await this.userRepository.create({
      name: professionaUser.user.name,
      email: professionaUser.user.email.value,
      password: await professionaUser.user.password.getHashedValue()
    });

    const newProfessinal = await this.professionalRepository.create({
      license: professionaUser.license,
      userId: newUser.id
    });

    return newProfessinal;

  }




}