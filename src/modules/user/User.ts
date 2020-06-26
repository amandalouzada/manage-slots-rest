import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";


interface IUserProps {
  id?:string;
  name: string;
  email: UserEmail;
  password: UserPassword;
  accessToken?: string;
}

export class User {
  private constructor(private props: IUserProps) {
    this.props = props
  }


  get id(): string | undefined {
    return this.props.id;
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

  get accessToken(): string | undefined {
    return this.props.accessToken;
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