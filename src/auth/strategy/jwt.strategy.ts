import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
        jwtFromRequest: (req) => {
          if (req && req.session) {
            return req.session.jwt;
          }
          return null;
        },
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET || 'tes123', // Provide your secret key here
      });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.usersService.findOne(parseInt(payload.sub));
    if (!user) {
      throw new Error("belum login");
    }
    return user;
  }
}