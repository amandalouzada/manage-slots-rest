import { ISlotsRequestDto } from './ISlotsDTO';
export interface IIntervalOfTime { start: number; end: number }
export interface IIntervalsByDayOfWeek {
  dayOfWeek: string;
  intervalsOfTime: IIntervalOfTime[];
}
export default interface ISlotService {
  createMany(slotsRequestDTO:ISlotsRequestDto): Promise<any>;
}