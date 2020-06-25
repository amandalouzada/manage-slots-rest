import CustomerModel from "@infra/mongoose/models/Customer";
import { CustomerRepository } from "./CustomerRepository";

const customerRepository = new CustomerRepository(CustomerModel);

export { customerRepository }