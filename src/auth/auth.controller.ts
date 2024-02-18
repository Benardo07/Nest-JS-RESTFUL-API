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
import { JwtService } from '@nestjs/jwt';
import { UseGuards } from '@nestjs/common';
import { AuthGuard} from '@nestjs/passport';
import { JwtGuard } from '../guards/jwt.guards';
import { response } from 'express';
@Controller('auth')

@serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class AuthController {

    constructor(private usersService: UsersService, private authService: AuthService,private jwtService: JwtService,){}
    @Post('/register')

    async register(@Body() body : CreateUserDto , @Session() session: any){
        const user = await this.authService.register(body.email,body.name, body.password);
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        session.jwt = access_token;
        return user;
    }

    @Post('/login')

    async login(@Body() body : LoginUserDto , @Session() session: any){
        const user = await this.authService.login(body.email, body.password);

        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        session.jwt = access_token;
        console.log(access_token); 

        return user;
    }

    @UseGuards(JwtGuard)
    @Post('/logout')
    logout(@Session() session:any){
        session.jwt = null; 
        console.log("log Out succes");
        return "Succes logout";
    }

    @Get('/whoami')

    async whoamI(@CurrentUser() user: User){
        return user;
    }

    


}
