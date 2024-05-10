import { PartialType } from '@nestjs/mapped-types';
import { CreateChurchDto } from './create-church.dto';
import { Shepherd } from 'src/shepherds/entities/shepherd.entity';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateChurchDto extends PartialType(CreateChurchDto) {

    @IsOptional()
    @IsString()
    @IsUUID()
    @Type(()=>Shepherd)
    shepherd: Shepherd;
    
}
