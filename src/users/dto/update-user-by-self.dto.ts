import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserBySelfDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    fullname?:string;
}
