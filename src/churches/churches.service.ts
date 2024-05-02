import { Injectable, Logger } from '@nestjs/common';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { handlerDbError } from 'src/common/helpers';
import { Church } from './entities/church.entity';

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

  findAll() {
    return this.churchRepository.findOne({ 
      //select: {},
      where: { slug: 'el_salado-10'}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} church`;
  }

  update(id: number, updateChurchDto: UpdateChurchDto) {
    return `This action updates a #${id} church`;
  }

  remove(id: number) {
    return `This action removes a #${id} church`;
  }
}
