import { differenceInMinutes } from 'date-fns';
import ErrorLib from '@core/ErrorLib';


interface IAvailabilityProps {
  id?: string;
  start: Date;
  end: Date;
  status: string;
  customerId?: string;
}

export class Availability {
  constructor(private props: IAvailabilityProps) {
    this.props = props;
  }

  get id(): string | undefined {
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

  get customerId(): string | undefined {
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
      throw new ErrorLib({
        message: 'start and end not valid',
        httpCode: 409
      });
    }
    const slot = new Availability(props);
    return slot;
  }
}