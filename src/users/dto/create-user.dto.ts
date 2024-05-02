import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEmail, IsIn, IsNumber, IsOptional, IsString, IsUUID, Matches, MinLength } from "class-validator";

import { Church } from "src/churches/entities/church.entity";
import { Position } from "src/positions/entities/position.entity";

export class CreateUserDto {

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(10)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password:string;

    @IsString()
    @MinLength(2)
    fullname: string;

    @IsString()
    @MinLength(2)
    lastname: string;

    @IsString()
    @IsIn(['Masculino', 'Femenino'])
    gender:string;

    @IsOptional()
    @IsString()
    @IsIn(['A+','B+','O+','AB+','A-','B-','O-','AB-'])
    bloodType?:string;

    @IsDate()
    @Type( ()=>Date)
    birthdate: Date;  //1855-03-30

    @IsOptional()
    @IsBoolean()
    isMarried?: boolean;

    @IsOptional()
    @IsBoolean()
    isBaptized?:boolean;

    @IsOptional()
    @IsDate()
    @Type( ()=>Date)
    birthBaptized?: Date;

    @IsOptional()
    @IsBoolean()
    holySpirit?: boolean;

    @IsOptional()
    @IsDate()
    @Type( ()=>Date)
    dateHolySpirit?: Date;
   

    @IsNumber()
    @Type( ()=>Number)
    tel: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsString()
    @MinLength(3)
    nationality: string;

    @IsString()
    @MinLength(3)
    provinceOfBirth: string;

    @IsString()
    @MinLength(3)
    cityOfBirth: string;
     
    @IsString()
    @MinLength(3)
    countryOfResidence: string;

    @IsString()
    @MinLength(3)
    provinceOfResidence: string;
    
    @IsString()
    @MinLength(3)
    cityOfResidence: string;
    
    @IsOptional()
    @IsString()
    @MinLength(3)
    address?: string;
    
    @IsOptional()
    @IsString()
    @IsUUID()
    church?:Church;
    
    @IsOptional()
    @IsArray()
    @IsUUID('all',{ each:true })
    positions?:Position[];

}
