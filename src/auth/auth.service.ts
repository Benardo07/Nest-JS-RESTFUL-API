import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { randomBytes, scrypt as _scrypt} from "crypto";
import { promisify } from "util";
import { resourceUsage } from "process";

const scrypt = promisify(_scrypt);

@Injectable()

export class AuthService {
    constructor(private userService : UsersService){}


    async register(email: string, name: string, password: string){
        const users = await this.userService.find(email);

        if(users.length){
            throw new BadRequestException("Email sudah terdaftar");
        }


        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password,salt,64)) as Buffer;
        const hashedPassword = salt + '.' + hash.toString('hex');


        const user = await this.userService.create(name,email,hashedPassword);

        return user;
    }


    async login(email: string, password: string){
        const [user] =  await this.userService.find(email);

        if(!user){
            throw new NotFoundException('Email tidak terdaftar');
        }

        const [salt,storedHashed] = user.password.split('.');

        const hash = (await scrypt(password,salt,64)) as Buffer;

        if(hash.toString('hex') !== storedHashed){
            throw new BadRequestException('Wrong password');
        }

        return user;
    }
}