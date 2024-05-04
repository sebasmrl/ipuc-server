import { Type } from "class-transformer";
import { IsArray, IsDate, IsIn, IsObject, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
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

    @IsOptional()
    @IsString({ each:true})
    @IsArray()
    @IsIn(['LOCAL_USERS_ADMIN', 'LOCAL_USERS_READER', //give shephed
            'LOCAL_PUBLISHER', 'COMMITE_PUBLISHER' , 'LOCAL_PUBLISHER_READER', // boss committee
            'COMMITTEE_ADMIN', 'COMMITTEE_READER' ]) //members committe
    roles: string[];

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
