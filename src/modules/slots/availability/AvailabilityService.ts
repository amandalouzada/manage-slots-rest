import IAvailabilityService from "./IAvailabilityService";
import IAvailabilityRepository from "./IAvailabilityRepository";
import { isAfter } from "date-fns";

export default class AvailabilityService implements IAvailabilityService {
  public availabilityRepository: IAvailabilityRepository;
  constructor(availabilityRepository: IAvailabilityRepository) {
    this.availabilityRepository = availabilityRepository;
  }


  booksASession = async (availabilityId: string, customerId: string): Promise<any> => {
    const availability = await this.availabilityRepository.getById(availabilityId);
    if (availability.status != 'available' || !isAfter(availability.dateTime, new Date())) throw new Error('unavailable');
    return await this.availabilityRepository.update({
      id: availabilityId,
      customerId,
      status: 'reserved'
    })
  };



}