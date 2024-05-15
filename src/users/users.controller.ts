import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';

import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...data} =  await this.usersService.create(createUserDto);
    return data;
  }

  @Get()
  async findAll( @Query() paginationDto: PaginationDto) {
    const users = await this.usersService.findAll(paginationDto);
    return users.map( ({password, ...data}) => data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {
    const { password, ...data } = await this.usersService.findOne(id);
    return data;
  }


  //TODO:church most be a param  church/:church/:id
  @Get('church/:searchTerm')
  async findOneByFullNameOrLastname(@Param('searchTerm' ) searchTerm: string){
    const users = await this.usersService.findOneByFullNameOrLastname(searchTerm);
    return users.map( ({password, ...data}) => data);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    const { password, ...data } = await this.usersService.update(id, updateUserDto);
    return data;
  }


  @Delete('admin/:id')
  removeByAdmin(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
  
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    //TODO:Verify if it is the same user, when the authenticated person has a position or is a directive
    return this.usersService.remove(id);
  }
}
