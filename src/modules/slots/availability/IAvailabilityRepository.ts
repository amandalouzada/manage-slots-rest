export default interface IAvailabilityRepository {
  getById(id: string): Promise<any>
  create(availability: { professionalId: string, customerId?: string, slotId: string, dateTime: Date, status: string }): Promise<any>;
  update(availability: { id: string, customerId?: string, status?: string }): Promise<any>;
}