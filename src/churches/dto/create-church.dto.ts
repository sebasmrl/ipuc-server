import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateChurchDto {

    @IsString()
    @MinLength(2)
    campusName: string;

    @IsString()
    @MinLength(2)
    country: string;

    @IsNumber()
    @IsPositive()
    district: number;

    @IsString()
    @MinLength(2)
    province:string;
    
    @IsString()
    @MinLength(2)
    city:string;

    @IsString()
    @MinLength(8)
    address: string;
}
