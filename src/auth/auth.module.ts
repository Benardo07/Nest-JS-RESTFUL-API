import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';

import { CurentUserMiddleware } from './middleware/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
            PassportModule.register({ defaultStrategy: 'jwt' }),
            JwtModule.register({
              secret: process.env.JWT_SECRET || 'tes123', // Use an environment variable for your secret key
              signOptions: { expiresIn: '60m' }, // Token expiration time
            }),
  ],
  providers: [AuthService,UsersService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {

  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurentUserMiddleware).forRoutes('*');
  }
}
