
export default interface IUserRepository {
  create(user: { name: string; email: string, password: string }): Promise<any>;
  getByEmail(email: string): Promise<any>;
}