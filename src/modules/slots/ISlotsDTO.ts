export interface IIntervalOfTime { start: number; end: number };
export interface IIntervalsByDayOfWeek {
  dayOfWeek: string;
  intervalsOfTime: IIntervalOfTime[];
};

export interface ISlotsRequestDto {
  professionalId: string;
  intervalsByDayOfWeek: IIntervalsByDayOfWeek[];
  start: Date;
  end: Date;
};