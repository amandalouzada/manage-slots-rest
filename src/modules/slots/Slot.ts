import { range } from 'lodash';
import { Availability } from './availability/Availability';
import { differenceInMinutes, addMinutes } from 'date-fns';


interface ISlotProps {
  professionalId: string;
  start: Date;
  end?: Date;
  availabilities?: Availability[]
}

export class Slot {
  constructor(private props: ISlotProps) {
    this.props = props;
  }
  get professionalId(): string {
    return this.props.professionalId;
  }
  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }

  get availabilities(): Availability[] {
    if (!!this.props.availabilities) {
      return this.props.availabilities
    }
    this.addAvailableAvailabilities(30);
    return this.props.availabilities;
  }

  calculatorAvailabilities(duration: number): { start: Date; end: Date }[] {
    const slotDuration = differenceInMinutes(
      this.props.end,
      this.start
    );
    const amountAvailabilitie = Math.round(slotDuration / duration);
    const calculatorAvailability = (factor: number) => {
      const start = addMinutes(this.props.start, Math.round(factor * duration));
      const end = addMinutes(start, duration);
      return {
        start,
        end
      }
    };
    return range(amountAvailabilitie).map(calculatorAvailability)
  }

  addAvailableAvailabilities(duration: number) {
    this.props.availabilities = this.calculatorAvailabilities(duration)
      .map(availability => Availability.create({ ...availability, status: 'available' }))
  }

  public static create(props: ISlotProps): Slot {
    const slot = new Slot(props);
    return slot;
  }


}