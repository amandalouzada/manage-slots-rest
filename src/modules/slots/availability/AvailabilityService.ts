import IAvailabilityService from "./IAvailabilityService";
import { isAfter } from "date-fns";
import ISlotRepository from "../ISlotRepository";

export default class AvailabilityService implements IAvailabilityService {
  constructor(private slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }


  booksASession = async (availabilityId: string, customerId: string): Promise<any> => {
    const availability = await this.slotRepository.getByAvailability(availabilityId);
    if (availability.status != 'available' || !isAfter(availability.start, new Date())) throw new Error('unavailable');
    return await this.slotRepository.updateAvailability(availabilityId,{
      customerId,
      status: 'reserved'
    })
  };



}