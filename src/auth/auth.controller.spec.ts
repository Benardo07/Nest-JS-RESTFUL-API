import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { User } from '../users/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let fakeUserService : Partial<UsersService>;
  let fakeAuthService : Partial<AuthService>;
  beforeEach(async () => {
    fakeUserService = {};
    fakeAuthService = {
      login: (email:string,password:string) => {
        return Promise.resolve({id:1,email,password} as User)
      }
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide : UsersService,
          useValue: fakeUserService,
        },
        {
          provide : AuthService,
          useValue: fakeAuthService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should return user login', async () => {
    const session = {
      userId : -10,
    };
    const user = await controller.login({email: 'jane@mail.com',password:'pass'},session);

    expect(user).toEqual({
      id:1,
      email : 'jane@mail.com',
      password: 'pass',
    });

    expect(session.userId).toEqual(1);
  });
});
