import { AuthController } from "./AuthController";
import { AuthService } from "./AuthService";
import { professionalRepository } from '@modules/professional';
import { userRepository } from '@modules/user';
import { customerRepository } from "@modules/customer";

const authService = new AuthService(professionalRepository, customerRepository, userRepository);
const authController = new AuthController(authService)

export {
  authController,
  authService
}