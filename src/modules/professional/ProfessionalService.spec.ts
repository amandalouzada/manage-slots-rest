import IProfessionalRepository from "./IProfessionalRepository";
import { ProfessionalService } from "./ProfessionalService";

describe('Manage user', () => {
  const professionalRepositor: IProfessionalRepository = {
    // create: jest.fn(),
  }

  it('should be able instance service', async () => {
    const professionalService = new ProfessionalService(professionalRepositor);
    expect(professionalService).toBeDefined();
  })

})