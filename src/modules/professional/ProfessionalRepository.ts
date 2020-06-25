import IProfessionalRepository from "./IProfessionalRepository";
import { IProfessionalModel } from "@infra/mongoose/models/Professional";
import MongooseRepository from "@infra/mongoose/MongooseRepository";

export class ProfessionalRepository extends MongooseRepository<IProfessionalModel> implements IProfessionalRepository {


  async create(professional: { userId: string; license: string; }): Promise<any> {
    const newProfessional = new this.model(professional);
    return (await newProfessional.save());
  }

  async getById(id: string): Promise<any> {
    return this.model.findById(id).populate('userId');
  }

  async findOne(data: { userId?: string, license?: string }): Promise<any> {
    return this.model.findOne(data).populate('userId');
  }

}