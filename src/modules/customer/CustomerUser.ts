import { User } from "../user/User";


interface ICustomerUser {
  user: User;
}

export class CustomerUser {
  constructor(private props: ICustomerUser) {
    this.props = props
  }

  get user(): User {
    return this.props.user;
  }

  public static create(props: ICustomerUser): CustomerUser {
    return new CustomerUser(props)
  }

}