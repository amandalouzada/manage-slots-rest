export default interface IAvailabilityService {
  booksASession(availabilityId: string, customerId: string): Promise<any>;
}