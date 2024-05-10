import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { handlerDbError } from 'src/common/helpers';
import { Church } from './entities/church.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ChurchesService {

  private logger = new Logger();

  constructor(
    @InjectRepository(Church)
    private readonly churchRepository:Repository<Church>
  ){}

  async create(createChurchDto: CreateChurchDto) {
    const church = this.churchRepository.create(createChurchDto);
    try{
      return await this.churchRepository.save(church);
    }catch(e){
      handlerDbError(e, this.logger)
    }
  }

  async findAll(paginationDto:PaginationDto) {
    const { limit=10, skip=0 }= paginationDto;
    return await this.churchRepository.find({
      where:{},
      take:limit,
      skip:skip
    });
  }

  async findAllByName(searchTerm:string, paginationDto:PaginationDto) {
    const { limit=10, skip=0 }= paginationDto; 
    
    await this.churchRepository.find({
      where:{
        campusName:ILike(searchTerm)
      },
      take:limit,
      skip:skip
    });
  }

  async findOne(id: string) {
    return await this.churchRepository.findOneBy({id});
  }

  async update(id: string, updateChurchDto: UpdateChurchDto) {
    try{
      const exist = await this.churchRepository.existsBy({id});
      if(!exist) throw new BadRequestException(`Usuario con id:${id} no existe`);

      await this.churchRepository.update(id, updateChurchDto)
      return true;

    }catch(e){
      handlerDbError(e, this.logger);
    }
  }

  //Permanenly delete register
  delete(id: string) {
    return this.churchRepository.delete({id})
  }
}
