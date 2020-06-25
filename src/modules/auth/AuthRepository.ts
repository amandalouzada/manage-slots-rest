import { extend } from "lodash";
import { UserRepository } from "@modules/user/UserRepository";

export class AuthRepository extends UserRepository {
  findById(id: string) {
    this.model.findById(id).select('+password');
  }
}