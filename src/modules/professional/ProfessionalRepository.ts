import IProfessionalRepository from "./IProfessionalRepository";
import { IProfessionalModel } from "@infra/mongoose/models/Professional";
import MongooseRepository from "@infra/mongoose/MongooseRepository";

export class ProfessionalRepository extends MongooseRepository<IProfessionalModel> implements IProfessionalRepository {

  async getByEmail(email: string): Promise<any> {
    return this.model.aggregate([{
      $match: { 'user.email': email }
    }, {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'usert'
      }
    }]);
  }

  async create(professional: { userId: string; license: string; }): Promise<any> {
    const newProfessional = new this.model(professional);
    return (await newProfessional.save());
  }

  getById(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async findOne(data: { userId?: string; license?: string; }): Promise<any> {
    return this.model.findOne(data).populate({
      path: 'userId',
      select: ['password', 'email', 'name']
    });
  }


}