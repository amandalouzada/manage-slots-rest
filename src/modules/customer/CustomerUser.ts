import { User } from "../user/User";


interface ICustomerUser {
  id?: string;
  user: User;
}

export class CustomerUser {
  constructor(private props: ICustomerUser) {
    this.props = props
  }
  
  get id(): string {
    return this.props.id;
  }

  get user(): User {
    return this.props.user;
  }

  public static create(props: ICustomerUser): CustomerUser {
    return new CustomerUser(props)
  }

}