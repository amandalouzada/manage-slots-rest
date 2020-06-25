
export interface ICustomerService {
  create(customer: { userId: string }): Promise<any>;
  createCustomerAndUser(user: { name: string; email: string, password: string })
}