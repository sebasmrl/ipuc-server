import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ChurchesService } from './churches.service';
import { CreateChurchDto } from './dto/create-church.dto';
import { UpdateChurchDto } from './dto/update-church.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('churches')
export class ChurchesController {
  constructor(private readonly churchesService: ChurchesService) {}

  @Post()
  create(@Body() createChurchDto: CreateChurchDto) {
    return this.churchesService.create(createChurchDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.churchesService.findAll(paginationDto);
  }

  @Get('name/:searchTem')
  findAllByName(@Param('searchTem') searchTem:string, @Query() paginationDto: PaginationDto) {
    return this.churchesService.findAllByName(searchTem, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.churchesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateChurchDto: UpdateChurchDto) {
    return this.churchesService.update(id, updateChurchDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.churchesService.delete(id);
  }
}
