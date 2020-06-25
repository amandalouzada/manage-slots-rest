import { User } from "../user/User";


interface IProfessionalUser {
  id?: string;
  license: string;
  user: User;
}
export class ProfessionalUser {
  constructor(private props: IProfessionalUser) {
    this.props = props
  }

  get user(): User {
    return this.props.user;
  }

  get id(): string {
    return this.props.id;
  }

  get license(): string {
    return this.props.license;
  }

  public static create(props: IProfessionalUser): ProfessionalUser {
    return new ProfessionalUser(props)
  }

}