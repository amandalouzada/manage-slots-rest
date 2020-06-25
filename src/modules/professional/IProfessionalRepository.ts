
export default interface IProfessionalRepository {
  create(professional: { userId: string, license: string }): Promise<any>;
  getById(id: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  findOne(data: any): Promise<any>;
}