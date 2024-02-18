import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Session, UseInterceptors } from '@nestjs/common';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from '../users/dtos/user.dto';
import { CurrentUser } from './decorators/curent-user.decorators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { User } from '../users/user.entity';
@Controller('auth')

@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {

    constructor(private usersService: UsersService, private authService: AuthService){}
    @Post('/register')

    async register(@Body() body : CreateUserDto , @Session() session: any){
        const user = await this.authService.register(body.email,body.name, body.password);
        session.userId = user.id;

        return user;
    }

    @Post('/login')

    async login(@Body() body : LoginUserDto , @Session() session: any){
        const user = await this.authService.login(body.email, body.password);

        session.userId = user.id;

        return user;
    }

    @Post('/logout')

    logout(@Session() session:any){
        session.userId = null;
    }

    @Get('/whoami')

    async whoamI(@CurrentUser() user: User){
        return user;
    }

    


}
