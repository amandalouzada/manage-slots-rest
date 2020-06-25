import { range } from 'lodash';
import { differenceInMinutes } from 'date-fns';


interface IAvailabilityProps {
  id?:string;
  start: Date;
  end: Date;
  status: string;
  customerId?: string;
}

export class Availability {
  constructor(private props: IAvailabilityProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get start(): Date {
    return this.props.start;
  }

  get end(): Date {
    return this.props.end;
  }

  get status(): string {
    return this.props.status;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get value(): IAvailabilityProps {
    return this.props;
  }

  private static isValidDuration(props: IAvailabilityProps): boolean {
    return differenceInMinutes(props.end, props.start) >= 1;
  }

  public static create(props: IAvailabilityProps): Availability {
    if (!this.isValidDuration(props)) {
      throw new Error('start and end not valid');
    }
    const slot = new Availability(props);
    return slot;
  }
}