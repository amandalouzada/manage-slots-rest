
export interface IProfessionalService {
  create(professional: { license: string; userId: string }): Promise<any>;
  getByEmail(email: string ): Promise<any>;
  createProfessionalAndUser(professional: { license: string; }, user: { name: string; email: string, password: string })
}