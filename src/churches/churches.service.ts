import { Injectable, Logger } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    const { limit, skip }= paginationDto;
    return await this.churchRepository.find({
      where:{},
      take:limit,
      skip:skip
    });
  }

  async findOne(id: string) {
    return await this.churchRepository.findOneBy({id});
  }

  update(id: number, updateChurchDto: UpdateChurchDto) {
    return `This action updates a #${id} church`;
  }

  remove(id: string) {
    return this.churchRepository.delete({id})
  }
}
