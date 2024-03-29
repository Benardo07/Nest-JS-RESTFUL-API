import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { UserDto } from "../users/dtos/user.dto";
import { map } from "rxjs";


interface ClassConstructor{
    new (...args: any[]): object;
}

export function serialize(dto:ClassConstructor){
    return UseInterceptors(new SerializeInterceptors(dto));
}

export class SerializeInterceptors implements NestInterceptor {

    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        return next.handle().pipe(
            map((data: any) => {
                return plainToClass(this.dto,data,{
                    excludeExtraneousValues: true,
                })
            })
        );

    }


}