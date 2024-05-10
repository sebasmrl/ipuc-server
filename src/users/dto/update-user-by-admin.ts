import { Church } from 'src/churches/entities/church.entity';
import { UpdateUserBySelfDto } from './update-user-by-self.dto';
import { ArrayMinSize, IsArray, IsIn, IsOptional, IsString, IsUUID, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { Position } from 'src/positions/entities/position.entity';


export enum PositionsActions{
    FOR_AGREGATE='FOR_AGREGATE',
    FOR_REMOVE='FOR_REMOVE', 
    FOR_FINISHED='FOR_FINISHED', 
    FOR_DELETE='FOR_DELETE'
}

export class UpdateUserByAdmin extends UpdateUserBySelfDto {

    @IsOptional()
    @IsUUID()
    @Type(()=>Church)
    church?: Church;

    @IsOptional()
    @IsString()
    @IsIn([PositionsActions.FOR_AGREGATE, PositionsActions.FOR_REMOVE, 
        PositionsActions.FOR_FINISHED, PositionsActions.FOR_DELETE])
    positionsAction?: PositionsActions;

    @IsOptional()
    @IsUUID('all',{ each:true})
    @IsArray()
    @ArrayMinSize(1)
    positions?: Position[];

}