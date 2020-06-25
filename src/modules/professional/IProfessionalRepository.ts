
export default interface IProfessionalRepository {
  create(professional: { userId: string, license: string }): Promise<any>;
  getById(id: string): Promise<any>;
  findOne(data: { userId?: string, license?: string }): Promise<any>;
}