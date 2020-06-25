import { IProfessionalService } from "./IProfessionalService";
import IProfessionalRepository from "./IProfessionalRepository";

export class ProfessionalService implements IProfessionalService {

  constructor(private professionalRepository: IProfessionalRepository) {
    this.professionalRepository = professionalRepository;
  }
  create(professional: { license: string; userId: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }
  createProfessionalAndUser(professional: { license: string; }, user: { name: string; email: string; password: string; }) {
    throw new Error("Method not implemented.");
  }


}