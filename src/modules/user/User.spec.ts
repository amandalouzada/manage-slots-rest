import { User } from "./User"
import { UserEmail } from "./UserEmail"
import { UserPassword } from "./UserPassword";

describe('Domain user', () => {

  const userEmail = UserEmail.create('amandanuneslouzada@gmail.com');
  const userPassword = UserPassword.create({ value: '123456' });

  it('should be able create valid password hash', async () => {
    expect(await userPassword.getHashedValue()).toBeDefined();
    expect(await userPassword.comparePassword('123456')).toBeTruthy();
  })

  it('should be able compare invalid password', async () => {
    expect(await userPassword.comparePassword('123457')).toBeFalsy();
  })

  it('should be able create valid email', async () => {
    expect(userPassword.getHashedValue()).toBeDefined();
    expect(userPassword.comparePassword('123456')).toBeTruthy();
  })

  it('should be able create instance User', async () => {
    const user = User.create({
      name: 'Amanda Louzada',
      email: userEmail,
      password: userPassword
    });
    expect(true).toBe(true);
    expect(user).toBeInstanceOf(User);
  })



})