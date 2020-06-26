import { IAuthService } from "./IAuthService";
import IUserRepository from "@modules/user/IUserRepository";
import ICustomerRepository from "@modules/customer/ICustomerRepository";
import IProfessionalRepository from "@modules/professional/IProfessionalRepository";
import { UserPassword } from "@modules/user/UserPassword";
import { UserEmail } from "@modules/user/UserEmail";
import { User } from "@modules/user/User";
import { ProfessionalUser } from "@modules/professional/ProfessionalUser";
import { CustomerUser } from "@modules/customer/CustomerUser";
import ErrorLib from "@core/ErrorLib";

export class AuthService implements IAuthService {

  constructor(private professionalRepository: IProfessionalRepository,
    private customerRepository: ICustomerRepository,
    private userRepository: IUserRepository
  ) {
    this.professionalRepository = professionalRepository;
    this.customerRepository = customerRepository;
    this.userRepository = userRepository;
  }



  async getUserByEmail(email: string): Promise<User> {
    const foundUser = await this.userRepository.getByEmail(email);
    const userPassword = UserPassword.create({ value: foundUser.password });
    const userEmail = UserEmail.create(foundUser.email);
    const user = User.create({
      password: userPassword,
      email: userEmail,
      name: foundUser.name,
      id: foundUser.id
    });
    return user;
  }

  async getProfessionalUserByEmail(email: string): Promise<ProfessionalUser> {
    const user = await this.getUserByEmail(email);
    const professional = await this.professionalRepository.findOne({ userId: user.id });
    if (!!professional) {
      const professionalUser = ProfessionalUser.create({
        id:professional.id,
        user: user,
        license: professional.license
      });
      return professionalUser
    }
    throw new ErrorLib({
      message: 'professional not found',
      httpCode: 404
    });
  }

  async getCustomerUserByEmail(email: string): Promise<CustomerUser> {
    const user = await this.getUserByEmail(email);
    const customer = await this.customerRepository.findOne({ userId: user.id });
    if (!!customer) {
      const customerUser = CustomerUser.create({
        id: customer.id,
        user: user,
      });
      return customerUser
    }
    throw new ErrorLib({
      message: 'customer not found',
      httpCode: 404
    });
  }

}