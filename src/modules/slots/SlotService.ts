import { flatten } from 'lodash/fp';
import { addMinutes } from 'date-fns';

import ISlotRepository from './ISlotRepository';
import ISlotService from './ISlotService';
import { ISlotsRequestDto } from './ISlotsDTO';
import { Slot } from './Slot';
import { SlotIntervals } from './SlotIntervals';

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
            availabilities: slot.availabilities
          })
        )
    )
  }



}