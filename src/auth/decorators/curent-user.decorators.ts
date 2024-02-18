import { createParamDecorator ,ExecutionContext} from "@nestjs/common";
import { ContextCreator } from "@nestjs/core/helpers/context-creator";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";

export const CurrentUser = createParamDecorator(
    (data: never,ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.currentUser;
    }
)