import { AuthController } from "./AuthController";
import { professionalService } from "@modules/professional";

const authController = new AuthController(professionalService)

export {
  authController
}