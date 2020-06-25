export default interface ICustomerRepository {
  create(professional: { userId: string }): Promise<any>;
  getById(id: string): Promise<any>;
  findOne(data: { userId: string}): Promise<any>;
}