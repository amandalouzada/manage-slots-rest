import { Availability } from "./Availability";

describe('Availability Domain', () => {

  it('should be able create availability', () => {

    const availability = Availability.create({
      start: new Date(`2020-07-13T13:00:00.000-00:00`),
      end: new Date(`2020-07-13T13:30:00.000-00:00`),
      status: 'available'
    });

    expect(availability).toHaveProperty('start');
    expect(availability).toHaveProperty('end');
    expect(availability).toHaveProperty('status');
  })
})