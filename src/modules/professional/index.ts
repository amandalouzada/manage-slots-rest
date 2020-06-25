import { ProfessionalRepository } from "./ProfessionalRepository";
import ProfessionalModel from "@infra/mongoose/models/Professional";
import { ProfessionalService } from "./ProfessionalService";
import { ProfessionalController } from "./ProfessionalController";
import { userRepository } from "@modules/user";

const professionalRepository = new ProfessionalRepository(ProfessionalModel);
const professionalService = new ProfessionalService(professionalRepository, userRepository);
const professionalController = new ProfessionalController(professionalService);

export  {
  professionalRepository,
  userRepository,
  professionalService,
  professionalController
};