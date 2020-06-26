import { extend } from "lodash";
import MongooseRepository from "@infra/mongoose/MongooseRepository";
import { ISlotModel } from "@infra/mongoose/models/Slot";
import ISlotRepository from "./ISlotRepository";

export class SlotRespository extends MongooseRepository<ISlotModel> implements ISlotRepository {

  async create(slot: { professionalId: string; start: Date; end: Date; availabilities: { start: Date; end: Date; status: string; }[]; }): Promise<any> {
    const newSlot = new this.model(slot);
    return newSlot.save();
  }
  async getById(id: string): Promise<any> {
    return this.model.findById(id).populate({
      path: 'professionalId',
      populate: 'userId'
    });
  }

  async getByAvailability(id: string): Promise<any> {
    return this.model.findOne({
      'availabilities._id': id
    }).populate({
      path: 'professionalId',
      populate: 'userId'
    });
  }

  async insertAvailability(id: string, availability: { start: Date; end: Date; }): Promise<any> {
    return this.model.updateOne({ id }, { $push: { availabilities: { ...availability, status: 'available' } } });
  }

  async getByInterval(start: Date, end: Date, professionalId?: string, status?: string) {
    const queryGeneric: { [key: string]: any } = {
      'availabilities.start': {
        $gte: start,
        $lte: end
      },
    };
    if (!!professionalId) queryGeneric['professionalId'] = professionalId;
    return this.model.find(queryGeneric).populate({
      path: 'professionalId',
      populate: 'userId'
    });
  }

  async updateAvailability(id: string, availability: { status: string; customerId: string }): Promise<any> {
    return this.model.updateOne({ id }, {
      status: availability.status,
      customerId: availability.customerId
    })
  }
}