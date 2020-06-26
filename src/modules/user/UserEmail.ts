
export interface IUserEmailProps {
  value: string;
}

export class UserEmail {

  private constructor(private props: IUserEmailProps) {
    this.props = props;
  }

  get value(): string {
    return this.props.value;
  }

  private static isValidEmail(email: string) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  private static format(email: string) {
    return email.trim().toLowerCase();
  }

  public static create(email: string): UserEmail {
    if (!this.isValidEmail(email)) {
      throw new ErrorLib({
        message: 'Email address not valid',
        httpCode: 409
      });
    }

    return new UserEmail({ value: this.format(email) });
  }
}