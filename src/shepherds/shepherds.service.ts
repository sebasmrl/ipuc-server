import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateShepherdDto } from './dto/create-shepherd.dto';
import { UpdateShepherdDto } from './dto/update-shepherd.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shepherd } from './entities/shepherd.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ShepherdsService {

  constructor(
    @InjectRepository(Shepherd)
    private readonly shepherdRepository: Repository<Shepherd>
  ) { }

  async create(createShepherdDto: CreateShepherdDto) {
    const shepherd = this.shepherdRepository.create(createShepherdDto);
    return await this.shepherdRepository.save(shepherd);
  }

  async findAll(paginationDto: PaginationDto) {
    const { skip, limit } = paginationDto;
    return await this.shepherdRepository.find({
      where: {},
      take: limit,
      skip: skip
    });
  }

  findFoo() {
    return "foo function for test"
  }

  async findOne(id: string) {
    return await this.shepherdRepository.findOneBy({ id })
  }

  update(id: number, updateShepherdDto: UpdateShepherdDto) {
    return `This action updates a #${id} shepherd`;
  }

  async remove(id: string) {

    const exist = await this.shepherdRepository.existsBy({ id });
    if (!exist) throw new BadRequestException(`Usuario con id:${id} no existe`);

    try {
      const rs = await this.shepherdRepository.update(id, {
        isRetired: true,
        dateRetired: new Date()
      });
      return true;
    } catch (e) {
      throw new InternalServerErrorException('Ocurrio un error al retirar al pastor')
    }

  }
}
