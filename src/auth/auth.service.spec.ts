import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService : Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService= {
      find: (email: string) => {
        const user = users.filter((user) =>user.email === email);
        return Promise.resolve(user);
      },
      create: (name: string, email: string, password: string) => {

          const user = {
          id : Math.floor(Math.random()*9999),
          name,
          email,
          password,
        } as User;

        users.push(user);
        return Promise.resolve(user);
      
      }
    };
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,{
        provide : UsersService,
        useValue : fakeUsersService,
      }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be a new user', async () => {
    const user = await service.register('jane@mail.com', 'Jane Doe','pass');

    console.log(user);
    expect(user.name).toBe('Jane Doe');
    expect(user.password).not.toEqual('pass');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user already exists', async () => {
    await service.register('Test', 'a@b.com', 'test');
    await expect(service.register('Test', 'a@b.com', 'test')).rejects.toThrow(
      'Email sudah terdaftar'
    );
  });

  it('should be rejected  login with the invalid email', async () => {
    await expect(service.login('admin@mail.com', 'password')).rejects.toThrow('Email tidak terdaftar');
  });

  it('should be rejected  login with the invalid password', async () => {
    await service.register('admin@mail.com','admin','pass');

    await expect(service.login('admin@mail.com','admin')).rejects.toThrow('Wrong password');
  });

  it('should be login with the valid password', async () => {
    await service.register('admin@mail.com','admin','pass');
    const user = await service.login('admin@mail.com', 'pass');
    expect(user).toBeDefined();
  });
});
