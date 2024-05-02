import { Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { Repository } from 'typeorm';
import { Position } from './entities/position.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PositionsService {

  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>
  ){}

  create(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.save(createPositionDto)
    return position;
  }

  findAll() {
    return `This action returns all positions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
