import { v4 as uuidv4 } from 'uuid';
import IAvailabilityRepository from "./IAvailabilityRepository";
import AvailabilityService from "./AvailabilityService";
import { addHours, addMinutes } from 'date-fns';
import ISlotRepository from '../ISlotRepository';

describe('Manage availability', () => {
  const slotRepository: ISlotRepository = {
    updateAvailability: jest.fn(async (id: string, availability: { customerId?: string, status?: string }) => {
      return {
        customerId: availability.customerId,
        start: addHours(new Date(), 60),
        end: addMinutes(new Date(), 90),
        id: id,
        status: 'reserved'
      }
    }),
    getByAvailability: jest.fn()
      .mockImplementation(async (id: string) => {
        return {
          customerId: uuidv4(),
          start: addHours(new Date(), 60),
          end: addMinutes(new Date(), 90),
          id: id,
          status: 'reserved'
        }
      })
      .mockImplementationOnce(async (id: string) => {
        return {
          customerId: uuidv4(),
          start: addHours(new Date(), 60),
          end: addMinutes(new Date(), 90),
          id: id,
          status: 'available'
        }
      }),
    create: jest.fn(),
    getById: jest.fn(),
    insertAvailability: jest.fn(),
    getByInterval: jest.fn(),
  }

  it('should be able to books a session', async () => {

    const availabilityService = new AvailabilityService(slotRepository);
    const availability = await availabilityService.booksASession(
      '1b978428-aebe-44bb-8a85-232cbf7c3983', '84e80966-a304-4742-8b72-f148697ab8ce');

    expect(availability).toHaveProperty('id');
    expect(availability).toHaveProperty('customerId');
    expect(availability).toHaveProperty('status', 'reserved');

  })

  it('doesn`t should be able to books a session', async () => {

    const availabilityService = new AvailabilityService(slotRepository);

    const booksASession = async () => await availabilityService.booksASession(
      '1b978428-aebe-44bb-8a85-232cbf7c3983', '84e80966-a304-4742-8b72-f148697ab8ce');
    expect(booksASession).rejects.toThrowError(Error);

  })


})