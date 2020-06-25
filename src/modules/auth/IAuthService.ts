import { User } from "@modules/user/User";
import { ProfessionalUser } from "@modules/professional/ProfessionalUser";
import { CustomerUser } from "@modules/customer/CustomerUser";

export interface IAuthService {
  getUserByEmail(email: string): Promise<User>;
  getProfessionalUserByEmail(email: string): Promise<ProfessionalUser>;
  getCustomerUserByEmail(email: string): Promise<CustomerUser>;

}