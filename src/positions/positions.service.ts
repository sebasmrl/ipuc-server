import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handlerDbError } from 'src/common/helpers';

@Injectable()
export class PositionsService {

  private logger = new Logger('PositionService');

  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>
  ){}

  create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.save(createPositionDto)
    return position;
  }

  async findAllByChurch(churchId:string, paginationDto:PaginationDto) {

    const  {skip=0, limit=10} =paginationDto;

    return this.positionRepository.find({

      where:{
        church: {
          id: churchId
        },
        from: LessThanOrEqual(new Date()),
        to: MoreThanOrEqual(new Date())
      },
      take:limit,
      skip:skip
    });
  }


  async findAllByUser(userId:string, paginationDto:PaginationDto) {

    const  {skip=0, limit=10, activeRegisters} =paginationDto;

    console.log(activeRegisters)

    if(activeRegisters == undefined)
       return await  this.positionRepository.find({
      where:{
        user: { id: userId }
      },
      take:limit,
      skip:skip
    })
    else if(activeRegisters) return await  this.positionRepository.find({
      where:{
        user: {  id: userId },
        from: LessThanOrEqual(new Date()),
        to: MoreThanOrEqual(new Date())
      },
      take:limit,
      skip:skip
    })
    else if(activeRegisters==false) return await  this.positionRepository.find({
      where:{
        user: {  id: userId },
        to: LessThanOrEqual(new Date()),
      },
      take:limit,
      skip:skip
    })
  }

  async findOne(id: string) {
    return this.positionRepository.findOne({
      loadRelationIds: {
        relations:['user']
      },
      relations: {
        church: true
      },
      where: { id:id},
    }
    );
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {

    if(Object.keys(updatePositionDto).length == 0) 
      throw new BadRequestException('Cuerpo de la peticion no puede ser vacío');

    if(!(this.positionRepository.existsBy({id})) ) 
      throw new BadRequestException(`Posición con id:${id} no existe`);

    const position = this.positionRepository.create(updatePositionDto);
    try{
      await  this.positionRepository.update(id,position);
    }catch(e:any){
      throw new handlerDbError(e, this.logger);
    }
    return await this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} position`;
  }
}
