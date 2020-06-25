import { v4 as uuidv4 } from 'uuid';
import { differenceInMinutes } from "date-fns";
import { Slot } from "./Slot";
import { SlotIntervals } from "./SlotIntervals";

describe('Slot Domain', () => {

  const start = new Date(`2020-06-10T00:00:00.000-00:00`);
  const end = new Date(`2020-06-16T23:59:59.000-00:00`);
  const slots = SlotIntervals.create({
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

  it('should be able to create list of slots', () => {
    expect(slots.intervals).toHaveLength(10);
    slots.intervals.forEach(slot => {
      expect(slot).toHaveProperty('professionalId', '1b978428-aebe-44bb-8a85-232cbf7c3983');
      expect(slot).toHaveProperty('start');
      expect(slot).toHaveProperty('end');
      expect(differenceInMinutes(slot.end, slot.start)).toBe(60);
    });

  })

  it('should be able add availability slot', () => {

    const slot = Slot.create({
      professionalId: uuidv4(),
      start: new Date(`2020-07-13T13:00:00.000-00:00`),
      end: new Date(`2020-07-13T14:00:00.000-00:00`),
    });
    expect(slot).toHaveProperty('professionalId');
    expect(slot).toHaveProperty('start');
    expect(slot).toHaveProperty('end');
    expect(slot).toHaveProperty('availabilities');
    slot.availabilities.forEach(availability => {
      expect(availability).toHaveProperty('end');
      expect(availability).toHaveProperty('start');
      expect(availability).toHaveProperty('status', 'available');
      expect(differenceInMinutes(availability?.end, availability?.start)).toBe(30);
    });
  })
})