import { ICustomerService } from "./ICustomerService";
import ICustomerRepository from "./ICustomerRepository";
import { User } from "@modules/user/User";
import { UserEmail } from "@modules/user/UserEmail";
import { UserPassword } from "@modules/user/UserPassword";
import { CustomerUser } from "./CustomerUser";
import IUserRepository from "@modules/user/IUserRepository";

export class CustomerService implements ICustomerService {

  constructor(private customerRepository: ICustomerRepository,
    private userRepository: IUserRepository
  ) {
    this.customerRepository = customerRepository;
    this.userRepository = userRepository;
  }

  async create(customer: { license: string; userId: string; }): Promise<any> {
    return this.customerRepository.create(customer);
  }

  async createCustomerAndUser(user: { name: string; email: string; password: string; }): Promise<any> {
    const customerUser = CustomerUser.create({
      user: User.create({
        name: user.name,
        email: UserEmail.create(user.email),
        password: UserPassword.create({ value: user.password })
      })
    });
    const newUser = await this.userRepository.create({
      name: customerUser.user.name,
      email: customerUser.user.email.value,
      password: await customerUser.user.password.getHashedValue()
    });

    const newCustomer = await this.customerRepository.create({
      userId: newUser.id
    });

    return newCustomer;

  }




}