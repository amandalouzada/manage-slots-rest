import { ICustomerModel } from "@infra/mongoose/models/Customer";
import MongooseRepository from "@infra/mongoose/MongooseRepository";
import ICustomerRepository from "./ICustomerRepository";

export class CustomerRepository extends MongooseRepository<ICustomerModel> implements ICustomerRepository {

  async create(customer: { userId: string }): Promise<any> {
    const newCustomer = new this.model(customer);
    return (await newCustomer.save());
  }

  async getById(id: string): Promise<any> {
    return this.model.findById(id).populate('userId');
  }

  async findOne(data: { userId: string }): Promise<any> {
    return this.model.findOne(data).populate('userId');
  }

}