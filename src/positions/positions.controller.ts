import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto) {
    return this.positionsService.create(createPositionDto);
  }

  @Get('church/:churchId')
  findAllByChurch(
    @Query()paginationDto:PaginationDto, 
    @Param('churchId', ParseUUIDPipe) churchId: string
  ) {
    return this.positionsService.findAllByChurch(churchId, paginationDto);
  }
  @Get('user/:userId')
  findAllByUser(
    @Query()paginationDto:PaginationDto, 
    @Param('userId', ParseUUIDPipe) userId: string
  ) {
    return this.positionsService.findAllByUser(userId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Get('self/:id')
  findOneBySelf(@Param('id') id: string) {
    return this.positionsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePositionDto: UpdatePositionDto) {
    return this.positionsService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.positionsService.remove(id);
  }
}
