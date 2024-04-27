import { Injectable } from '@nestjs/common';
import { CreateDirectiveDto } from './dto/create-directive.dto';
import { UpdateDirectiveDto } from './dto/update-directive.dto';

@Injectable()
export class DirectivesService {
  create(createDirectiveDto: CreateDirectiveDto) {
    return 'This action adds a new directive';
  }

  findAll() {
    return `This action returns all directives`;
  }

  findOne(id: number) {
    return `This action returns a #${id} directive`;
  }

  update(id: number, updateDirectiveDto: UpdateDirectiveDto) {
    return `This action updates a #${id} directive`;
  }

  remove(id: number) {
    return `This action removes a #${id} directive`;
  }
}
