import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptors } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { serialize } from '../interceptors/serialize.interceptors';
import { LoginUserDto } from '../auth/dtos/login-user.dto';
import { CurrentUser } from '../auth/decorators/curent-user.decorators';
import { User } from './user.entity';
import { AuthGuard } from '../guards/auth.guards';

@Controller('users')
@serialize(UserDto)
export class UsersController {

    constructor(private usersService: UsersService){}


    // @Get('/pet/:pet')

    // setPet(@Param('pet') pet: string, @Session() session : any){
    //     session.pet = pet;
    // }

    // @Get('/pet')

    // getPet(@Session() session: any){
    //     return session.pet;
    // }

    

    @Get()

    findAllUser(){
        return this.usersService.findAll();
    }


    @Post()

    createUser(@Body() body: CreateUserDto){
        return this.usersService.create(body.name,body.email,body.password);
    }

    @Get('/:id')

    findUser(@Param('id') id : string){
        return this.usersService.findOne(parseInt(id));
    }

    @Patch('/:id')

    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
        return this.usersService.update(parseInt(id),body)
    }

    @Delete('\:id')

    removeUser(@Param('id') id :string){
        return this.usersService.remove(parseInt(id));
    }

    @Get('/auth/current-user')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: User){
        return user;
    }



}
