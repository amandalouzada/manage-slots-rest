import { UserRepository } from "./UserRepository";
import UserModel from "@infra/mongoose/models/User";

const userRepository = new UserRepository(UserModel);

export { userRepository }