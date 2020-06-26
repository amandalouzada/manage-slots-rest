import { SlotService } from "./SlotService"
import ISlotRepository from "./ISlotRepository";
import { v4 as uuidv4 } from 'uuid';
import { differenceInMinutes } from "date-fns";

describe('Manage slots', () => {
  const slotRepository: ISlotRepository = {
    create: jest.fn(async (slot: { professionalId: string; start: Date, end: Date }) => {
      return {
        professionalId: slot.professionalId,
        start: slot.start,
        end: slot.end,
        id: uuidv4()
      }
    }),
    getById: jest.fn(),
    insertAvailability: jest.fn(),
    getByAvailability: jest.fn(),
    getByInterval: jest.fn(),
    updateAvailability: jest.fn()
  }

  it('should be able to create list of slots', async () => {

    const slotService = new SlotService(slotRepository);
    const start = new Date(`2020-06-10T00:00:00.000-00:00`);
    const end = new Date(`2020-06-16T23:59:59.000-00:00`);
    const slots = await slotService.createMany({
      professionalId: '1b978428-aebe-44bb-8a85-232cbf7c3983',
      intervalsByDayOfWeek: [
        {
          dayOfWeek: 'monday',
          intervalsOfTime: [
            { start: 1, end: 3 },
            { start: 2, end: 4 }
          ]
        },
        {
          dayOfWeek: 'tuesday',
          intervalsOfTime: [
            { start: 7, end: 9 },
            { start: 3, end: 5 }
          ]
        },
        {
          dayOfWeek: 'tuesday',
          intervalsOfTime: [
            { start: 8, end: 10 },
            { start: 18, end: 20 },
          ]
        },
      ],
      start,
      end
    });

    expect(slots).toHaveLength(10);
    slots.forEach((slot: any) => {
      expect(slot).toHaveProperty('id');
      expect(slot).toHaveProperty('professionalId', '1b978428-aebe-44bb-8a85-232cbf7c3983');
      expect(slot).toHaveProperty('start');
      expect(slot).toHaveProperty('end');
      expect(differenceInMinutes(slot.end, slot.start)).toBe(60);
    });
  })

})