import IUserRepository from "./IUserRepository";
import MongooseRepository from "@infra/mongoose/MongooseRepository";
import { IUserModel } from "@infra/mongoose/models/User";

export class UserRepository extends MongooseRepository<IUserModel> implements IUserRepository {

  async create(user: { name: string; email: string; password: string; }): Promise<any> {
    const newUser = new this.model(user)
    return newUser.save();
  }

  async getByEmail(email: string): Promise<any> {
    return this.model.findOne({ email }).select('+password');
  }
}