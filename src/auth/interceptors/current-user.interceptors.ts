import { Injectable, NestInterceptor ,ExecutionContext, CallHandler} from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{
    constructor(private userSevice: UsersService){}

    async intercept(ctx: ExecutionContext, next: CallHandler) {
        const request = ctx.switchToHttp().getRequest();
        const token = request.session.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tes123');
        const userId = decoded.sub as string; 
        if (decoded.sub) {
          const user = await this.userSevice.findOne(parseInt(userId));
          console.log(user);
          request.currentUser = user;
        }
      } catch (error) {
        // Handle token verification errors if needed
      }
    }

        return next.handle();
    }

}