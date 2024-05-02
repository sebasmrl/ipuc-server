import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { Church } from "src/churches/entities/church.entity";
import { User } from "src/users/entities/user.entity";

export class CreatePositionDto {

    @IsString()
    name: string;

    @IsDate()
    @Type(()=>Date)
    from: Date;

    @IsDate()
    @Type(()=>Date)
    to:Date;

    //TODO: Relation with committee
    @IsString()
    @MinLength(3)
    committee:string;

    @IsOptional()
    @IsString()
    @IsUUID()
    @Type(()=>Church)
    church?: Church;

    @IsOptional()
    @IsUUID()
    @Type(()=>User)
    user?: User;
}
