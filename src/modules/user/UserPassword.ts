import bcrypt from 'bcryptjs';



interface IUserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword {

  private constructor(private props: IUserPasswordProps) {
    this.props = props
  }

  get value(): string {
    return this.props.value;
  }

  public isAlreadyHashed(): boolean {
    return (!!this.props.hashed);
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;

    if (this.isAlreadyHashed()) {
      hashed = this.props.value;

      return bcrypt.compare(plainTextPassword, hashed);
    }

    return this.props.value === plainTextPassword;
  }

  public async getHashedValue(): Promise<string> {
    if (this.isAlreadyHashed()) {
      return this.props.value;
    }
    return bcrypt.hash(this.props.value, 10);
  }

  public static create({
    value,
    hashed,
  }: IUserPasswordProps): UserPassword {

    const userPassword = new UserPassword({
      value,
      hashed,
    });
    return userPassword;
  }
}