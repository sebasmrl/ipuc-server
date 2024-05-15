import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shepherd } from './entities/shepherd.entity';
import { Like, Repository } from 'typeorm';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { StringModifiers, handlerDbError } from 'src/common/helpers';
import { CreateShepherdDto, UpdateShepherdDto } from './dto';

@Injectable()
export class ShepherdsService {

  private readonly logger =  new Logger('ShepherdService');

  constructor(
    @InjectRepository(Shepherd)
    private readonly shepherdRepository: Repository<Shepherd>
  ) { }

  async create(createShepherdDto: CreateShepherdDto) {
    const shepherd = this.shepherdRepository.create(createShepherdDto);
    return await this.shepherdRepository.save(shepherd);
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip=0, limit=10 } = paginationDto;
    return await this.shepherdRepository.find({
      where: {  
      },
      take: limit,
      skip: skip
    });
  }
  async findBySearchTerm(paginationDto: PaginationDto, searchTerm: string) {
    const { skip=0, limit=10 } = paginationDto;
    return await this.shepherdRepository.find({
      where: {
        fullname: Like(`%${StringModifiers.toUpperCase(searchTerm)}%`)
      },
      take: limit,
      skip: skip
    });
  }

  async findOne(id: string) {
    return await this.shepherdRepository.findOneBy({ id })
  }



  async update(id: string, updateShepherdDto: UpdateShepherdDto) {

    try {
       const exist = await this.shepherdRepository.existsBy({id});
       if(!exist) throw new BadRequestException(`Pastor con id:${id} no existe`);

       await this.shepherdRepository.update( id, updateShepherdDto);
       return true;
    } catch (e) {
        handlerDbError(e, this.logger);
    }
  }


  async remove(id: string) {

    const exist = await this.shepherdRepository.existsBy({ id });
    if (!exist) throw new BadRequestException(`Usuario con id:${id} no existe`);

    try {
      await this.shepherdRepository.update(id, {
        isRetired: true,
        dateRetired: new Date()
      });
      return true; 
    } catch (e) {
      throw new InternalServerErrorException('Ocurrio un error al retirar al pastor')
    }

  }
}
