import jwt from 'jsonwebtoken';

const authConfig = {
  secret: process.env.SECRET_KEY,
  tokenExpiryTimeInSeconds: 8 * 60 * 60,
};


interface IJWTProps {
  sub: string;
}

interface IJWTPayload {
  name: string;
  email: string;
  identity?: string;
}

export class JWT {
  public sub: string;

  public token: string;

  private constructor(props: IJWTProps) {
    this.sub = props.sub;
  }

  private static signJwt(props: IJWTProps, payload: IJWTPayload) {
    return jwt.sign(payload, authConfig.secret, {
      subject: props.sub,
      expiresIn: authConfig.tokenExpiryTimeInSeconds,
    });
  }

  public static create(props: IJWTProps, payload: IJWTPayload): JWT {

    const signedToken = this.signJwt(props, payload);
    const jwtToken = new JWT(props);

    jwtToken.token = signedToken;

    return jwtToken
  }
}
