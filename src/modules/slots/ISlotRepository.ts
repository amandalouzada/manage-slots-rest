export default interface ISlotRepository {
  create(slot: {
    professionalId: string;
    start: Date;
    end: Date;
    availabilities:{
      start: Date;
      end: Date;
      status: string;
    }[]
  }): Promise<any>;
  getById(id: string): Promise<any>;
  getByAvailability(id:string):Promise<any>;
  insertAvailability(id: string, availability: { start: Date; end: Date }): Promise<any>;
  getByInterval(start:Date, end:Date, professionalId?:string):Promise<any>;
  updateAvailability(id:string, availability:{status:string; customerId?:string}): Promise<any>;
}