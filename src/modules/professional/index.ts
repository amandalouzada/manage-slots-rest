import { ProfessionalRepository } from "./ProfessionalRepository";
import ProfessionalModel from "@infra/mongoose/models/Professional";
import { ProfessionalService } from "./ProfessionalService";
import { UserRepository } from "@modules/user/UserRepository";
import UserModel from "@infra/mongoose/models/User";
import { ProfessionalController } from "./ProfessionalController";

const professionalRepository = new ProfessionalRepository(ProfessionalModel);
const userRepository = new UserRepository(UserModel);
const professionalService = new ProfessionalService(professionalRepository, userRepository);
const professionalController = new ProfessionalController(professionalService);

export  {
  professionalRepository,
  userRepository,
  professionalService,
  professionalController
};