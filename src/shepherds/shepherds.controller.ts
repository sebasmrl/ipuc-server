import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put } from '@nestjs/common';
import { ShepherdsService } from './shepherds.service';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateShepherdDto, UpdateShepherdDto } from './dto';

@Controller('shepherds')
export class ShepherdsController {
  constructor(private readonly shepherdsService: ShepherdsService) {}

  @Post()
  async create(@Body() createShepherdDto: CreateShepherdDto) {
    const { password, fullname, ...data } = await  this.shepherdsService.create(createShepherdDto);
    return data;
  }

  @Get()
  async findAll( @Query() paginationDto:PaginationDto) {
    const shepherds = await this.shepherdsService.findAll(paginationDto);
    return  shepherds.map(({ password, fullname, ...data} )=> data)
  }

  @Get('search/:searchTerm')
  async findBySearchTerm( 
    @Query() paginationDto:PaginationDto, 
    @Param('searchTerm') searchTerm:string
  ) {
    const shepherds = await this.shepherdsService.findBySearchTerm(paginationDto, searchTerm);
    return  shepherds.map(({ password, fullname, ...data} )=> data)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const { password, fullname, ...data } = await this.shepherdsService.findOne(id);
    return data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShepherdDto: UpdateShepherdDto) {
    return this.shepherdsService.update(id, updateShepherdDto);
  }

 

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.shepherdsService.remove(id);
  }
}
