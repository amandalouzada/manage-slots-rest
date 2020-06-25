import { v4 as uuidv4 } from 'uuid';
import IAvailabilityRepository from "./IAvailabilityRepository";
import AvailabilityService from "./AvailabilityService";
import { addHours } from 'date-fns';

describe('Manage availability', () => {
  const availabilityRepositor: IAvailabilityRepository = {
    update: jest.fn(async (availability: { id: string, customerId?: string, status?: string }) => {
      return {
        customerId: availability.customerId,
        professionalId: uuidv4(),
        slotId: uuidv4(),
        dateTime: new Date(),
        id: availability.id,
        status: availability.status
      }
    }),
    getById: jest.fn()
      .mockImplementation(async (id: string) => {
        return {
          customerId: uuidv4(),
          professionalId: uuidv4(),
          slotId: uuidv4(),
          dateTime: addHours(new Date(), 10),
          id: id,
          status: 'reserved'
        }
      })
      .mockImplementationOnce(async (id: string) => {
        return {
          customerId: uuidv4(),
          professionalId: uuidv4(),
          slotId: uuidv4(),
          dateTime: addHours(new Date(), 10),
          id: id,
          status: 'available'
        }
      }),
    create: jest.fn(),
  }

  it('should be able to books a session', async () => {

    const availabilityService = new AvailabilityService(availabilityRepositor);
    const availability = await availabilityService.booksASession(
      '1b978428-aebe-44bb-8a85-232cbf7c3983', '84e80966-a304-4742-8b72-f148697ab8ce');

    expect(availability).toHaveProperty('id');
    expect(availability).toHaveProperty('professionalId');
    expect(availability).toHaveProperty('customerId', '84e80966-a304-4742-8b72-f148697ab8ce');
    expect(availability).toHaveProperty('dateTime');
    expect(availability).toHaveProperty('status', 'reserved');

  })

  it('doesn`t should be able to books a session', async () => {

    const availabilityService = new AvailabilityService(availabilityRepositor);

    const booksASession = async () => await availabilityService.booksASession(
      '1b978428-aebe-44bb-8a85-232cbf7c3983', '84e80966-a304-4742-8b72-f148697ab8ce');
    expect(booksASession).rejects.toThrowError(Error);

  })


})