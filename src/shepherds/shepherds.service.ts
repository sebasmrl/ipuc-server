import { Injectable } from '@nestjs/common';
import { CreateShepherdDto } from './dto/create-shepherd.dto';
import { UpdateShepherdDto } from './dto/update-shepherd.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shepherd } from './entities/shepherd.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShepherdsService {
 
  constructor(
    @InjectRepository(Shepherd)
    private readonly shepherdRepository: Repository<Shepherd>
  ){}

  async create(createShepherdDto: CreateShepherdDto) {
    const shepherd = this.shepherdRepository.create(createShepherdDto);
    return await this.shepherdRepository.save(shepherd);
  }

  findAll() {
    return `This action returns all shepherds`;
  }

  findFoo(){
    return ""
  }

  findOne(id: number) {
    return `This action returns a #${id} shepherd`;
  }

  update(id: number, updateShepherdDto: UpdateShepherdDto) {
    return `This action updates a #${id} shepherd`;
  }

  remove(id: number) {
    return `This action removes a #${id} shepherd`;
  }
}
