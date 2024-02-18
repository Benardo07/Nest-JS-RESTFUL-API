import { IsBoolean, isBoolean } from "class-validator";

export class ApproveItemDto {
    @IsBoolean()
    approved : boolean;

}