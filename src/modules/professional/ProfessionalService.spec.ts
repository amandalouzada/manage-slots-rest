import IProfessionalRepository from "./IProfessionalRepository";
import { ProfessionalService } from "./ProfessionalService";
import IUserRepository from "@modules/user/IUserRepository";
import { v4 as uuid } from 'uuid';

describe('', () => {
  const professionalRepositor: IProfessionalRepository = {
    create: jest.fn()
      .mockImplementation(async (professional: { userId: string; license: string }) => {
        return {
          id: uuid(),
          license: professional.license,
          user: {
            id: professional.userId,
            name: 'Amanda Louzada',
            email: 'amandanuneslouzada@gmail.com'
          }
        }
      }),
    getById: jest.fn(),
    findOne: jest.fn(),
  }
  const userRepository: IUserRepository = {
    create: jest.fn()
      .mockImplementation(async (user: { name: string; email: string; password: string }) => {
        return {
          user: {
            id: uuid(),
            name: user.name,
            email: user.email,
          }
        }
      }),
    getByEmail: jest.fn(),

  }

  it('should be able instance service', async () => {
    const professionalService = new ProfessionalService(professionalRepositor, userRepository);
    expect(professionalService).toBeDefined();
  })

  it('should be able create professional user', async () => {
    const professionalService = new ProfessionalService(professionalRepositor, userRepository);
    const professional = await professionalService.createProfessionalAndUser({
      license: '123'
    }, {
      name: 'Amanda Louzada',
      email: 'amandanuneslouzada@gmail.com',
      password: '654321'
    });

    expect(professional).toHaveProperty('id');
    expect(professional).toHaveProperty('user');
    expect(professional).toHaveProperty('user.id');
    expect(professional).toHaveProperty('user.email');
  })


})