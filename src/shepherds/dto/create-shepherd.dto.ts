import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsIn, IsNumber, IsOptional, IsPositive, IsString, Matches, MinLength } from "class-validator";

export class CreateShepherdDto {
    
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
    name: string;

    @IsString()
    @MinLength(2)
    lastname: string;

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

    @IsNumber()
    @IsPositive()
    tel:number;

    //TODO: relation with wife:User;
    
    @IsOptional()
    @IsBoolean()
    isRetired: boolean;

    @IsOptional()
    @IsDate()
    @Type( ()=>Date)
    dateRetired: Date;

    @IsOptional()
    @IsDate()
    birthBaptized: Date;

    @IsOptional()
    @IsDate()
    dateHolySpirit: Date;
    
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
    
}
