import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DirectivesService } from './directives.service';
import { CreateDirectiveDto } from './dto/create-directive.dto';
import { UpdateDirectiveDto } from './dto/update-directive.dto';

@Controller('directives')
export class DirectivesController {
  constructor(private readonly directivesService: DirectivesService) {}

  @Post()
  create(@Body() createDirectiveDto: CreateDirectiveDto) {
    return this.directivesService.create(createDirectiveDto);
  }

  @Get()
  findAll() {
    return this.directivesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directivesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectiveDto: UpdateDirectiveDto) {
    return this.directivesService.update(+id, updateDirectiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directivesService.remove(+id);
  }
}
