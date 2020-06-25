import CustomerModel from "@infra/mongoose/models/Customer";
import { CustomerRepository } from "./CustomerRepository";
import { CustomerService } from "./CustomerService";
import { userRepository } from "@modules/user";
import { CustomerController } from "./CustomerController";



const customerRepository = new CustomerRepository(CustomerModel);
const customerService = new CustomerService(customerRepository, userRepository);
const customerController = new CustomerController(customerService);

export {
  customerRepository,
  customerService,
  customerController
}