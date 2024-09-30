import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
const cookieExtractor = (req: Request) => {
  const token = req.cookies['jwt'];
  return token || null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]), 
      ignoreExpiration: false,
      secretOrKey: 'Modsen',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, login: payload.login };
  }
}
