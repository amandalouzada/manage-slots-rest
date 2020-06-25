import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";


interface IUserProps {
  name: string;
  email: UserEmail;
  password: UserPassword;
  accessToken?: string;
}

export class User {
  private constructor(private props: IUserProps) {
    this.props = props
  }

  get name(): string {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }


  public setAccessToken(accessToken: string): void {
    this.props.accessToken = accessToken;
  }

  public setEmail(email: UserEmail): void {
    this.props.email = email;
  }

  public static create(props: IUserProps): User {
    const user = new User(props);
    return user;
  }
}