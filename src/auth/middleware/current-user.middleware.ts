import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction ,Request,Response} from "express";
import { UsersService } from "../../users/users.service";
import { User } from "src/users/user.entity";
import * as jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
@Injectable()
export class CurentUserMiddleware implements NestMiddleware{
    constructor(private userService : UsersService){}

    async use (req: Request, res: Response, next:NextFunction){
        const token = req.session.jwt;

        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tes123');
                const userId = decoded.sub as string;

                if (userId) {
                    const user = await this.userService.findOne(parseInt(userId));
                    req.currentUser = user;
                }
            } catch (error) {
                // Handle token verification errors if needed
            }
        }
        next();
    }
    
}