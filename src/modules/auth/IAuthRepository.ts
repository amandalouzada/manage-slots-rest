import MongooseRepository from "@infra/mongoose/MongooseRepository";
import { IUserModel } from "@infra/mongoose/models/User";

export interface IAuthRepository {
  findById(id: string): Promise<any>;
}