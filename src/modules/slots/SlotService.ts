import { flatten } from 'lodash/fp';
import { addMinutes } from 'date-fns';

import ISlotRepository from './ISlotRepository';
import ISlotService from './ISlotService';
import { ISlotsRequestDto } from './ISlotsDTO';
import { Slot } from './Slot';
import { SlotIntervals } from './SlotIntervals';
import { Availability } from './availability/Availability';

export class SlotService implements ISlotService {
  constructor(private slotRepository: ISlotRepository) {
    this.slotRepository = slotRepository;
  }

  async createMany(slotsRequestDTO: ISlotsRequestDto): Promise<any> {
    return Promise.all(
      SlotIntervals.create(slotsRequestDTO).intervals
        .map
        (async slot =>
          await this.slotRepository.create({
            professionalId: slot.professionalId,
            start: slot.start,
            end: slot.end,
            availabilities: slot.availabilities.map(availability => availability.value)
          })
        )
    )
  }

  async listSlotsByInterval(start: Date, end: Date, professionalId?: string) {
    const slots = (await this.slotRepository.getByInterval(start, end, professionalId))
    return slots.map((slot: any) => {
      console.log(slot);
      return {
        professional: {
          id: slot.professionalId.id,
          name: slot.professionalId.userId.name,
          license: slot.professionalId.license
        },
        availabilities: slot.availabilities.map((availability: {
          id?: string;
          start: Date;
          end: Date;
          status: string;
          customerId?: string;
        }) => Availability.create(availability).value)
      }
    })

  }

}