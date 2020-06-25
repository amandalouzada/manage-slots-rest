import { zonedTimeToUtc } from 'date-fns-tz'
import { isMonday, isSunday, isTuesday, isWednesday, isThursday, isFriday, isSaturday, eachDayOfInterval, setHours, addMinutes, differenceInMinutes } from 'date-fns';
import { flatten, uniq, range, compose } from 'lodash/fp';
import { Slot } from './Slot';

export interface IIntervalOfTime { start: number; end: number }
export interface IIntervalsByDayOfWeek {
  dayOfWeek: string;
  intervalsOfTime: IIntervalOfTime[];
}

export interface ISlotsIntervalProps {
  professionalId: string;
  intervalsByDayOfWeek: IIntervalsByDayOfWeek[];
  start: Date;
  end: Date;
};

export class SlotIntervals {

  constructor(private props: ISlotsIntervalProps) {
    this.props = props;
  }

  get mergedIntervalsByDayOfWeek() {
    return this.mergeDaysOfWeek(this.props.intervalsByDayOfWeek);
  }
  get profissionalId(): string {
    return this.props.professionalId;
  }

  public static create(props: ISlotsIntervalProps): SlotIntervals {
    const slot = new SlotIntervals(props);
    return slot;
  }


  get intervals(): Slot[] {
    return flatten
      (
        this.mergedIntervalsByDayOfWeek.map(
          (intervalsByDayOfWeek) => this.getDays(intervalsByDayOfWeek, this.props.start, this.props.end)
        )
      ).map((slotDateTime) =>
        Slot.create({
          professionalId: this.props.professionalId,
          start: slotDateTime,
          end: addMinutes(slotDateTime, 60)
        })
      )
  }

  private getDays(dayOfWeekWithIntervals: IIntervalsByDayOfWeek, startDate: Date, endDate: Date) {
    const daysOfWeek: { [key: string]: any } = {
      sunday: isSunday,
      monday: isMonday,
      tuesday: isTuesday,
      wednesday: isWednesday,
      thursday: isThursday,
      friday: isFriday,
      saturday: isSaturday
    }
    if (!daysOfWeek[dayOfWeekWithIntervals.dayOfWeek]) throw new Error('invalid day')

    return flatten(eachDayOfInterval(
      {
        start: startDate,
        end: endDate
      })
      .filter(day => day > startDate && day < endDate)
      .filter((day) => daysOfWeek[dayOfWeekWithIntervals.dayOfWeek](day))
      .map((dateTime) => this.getSlotDateTime(dateTime, dayOfWeekWithIntervals)));
  }

  private getSlotDateTime(dateTime, dayOfWeekWithIntervals: IIntervalsByDayOfWeek) {
    return uniq(
      flatten
        (
          dayOfWeekWithIntervals.intervalsOfTime.map(
            interval => range(interval.start, interval.end)
          )
        )
    ).map((hour: number) => zonedTimeToUtc(setHours(dateTime, hour), '000'))
  }

  private mergeDaysOfWeek (intervalsByDayOfWeek: IIntervalsByDayOfWeek[]): IIntervalsByDayOfWeek[]{
    const daysOfWeek = uniq(intervalsByDayOfWeek.map(intervalByDayOfWeek => intervalByDayOfWeek.dayOfWeek));
    return daysOfWeek.map(dayOfWeek => {
      return {
        dayOfWeek: dayOfWeek,
        intervalsOfTime:
          compose(
            this.mergeIntervals,
            (dayOfWeek) =>
              intervalsByDayOfWeek
                .filter(intervalByDayOfWeek => intervalByDayOfWeek.dayOfWeek === dayOfWeek)
          )(dayOfWeek)
      }
    });

  }

  private mergeIntervals(intervalsByDayOfWeek: IIntervalsByDayOfWeek[]): IIntervalOfTime[] {
    return flatten(
      intervalsByDayOfWeek
        .map(intervalByDayOfWeek => intervalByDayOfWeek.intervalsOfTime));
  }


}
