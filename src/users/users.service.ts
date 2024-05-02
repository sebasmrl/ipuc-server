import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { And, DataSource, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { StringModifiers, handlerDbError } from 'src/common/helpers';

@Injectable()
export class UsersService {
  
  private readonly logger = new Logger('UsersService'); 

  constructor(  
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly datasource: DataSource
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const nUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(nUser);
      return user;
    }catch(e){
      handlerDbError(e, this.logger)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { skip=0, limit=10, activeRegisters} = paginationDto;
  
    let condition = (activeRegisters == undefined) 
      ? {} 
      : { isActive:activeRegisters}
    
    const users = await this.userRepository.find({
      relations:{positions:true},
      where: {...condition, 
        positions: {
        from: LessThan(new Date()),
        to: MoreThan(new Date())
      }},
      skip: skip,
      take:limit
    });

    return users;
  }


  async findOne(id: string) {
    return await this.userRepository.findOneBy({id})
  }

  async findOneByFullNameOrLastname(searchTerm:string){
    const user = await this.userRepository.find({
      where: [
        { fullname:  Like(`%${StringModifiers.toUpperCase(searchTerm)}%`)},
        { lastname:  Like(`%${StringModifiers.toUpperCase(searchTerm)}%`)},
      ]
    })

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const { positions, church, ...rest } = updateUserDto;
    if(positions || church) throw new BadRequestException('Los campos (positions) o (church) no se pueden modificar')

    if( Object.keys(rest).length == 0) throw new BadRequestException('El cuerpo de la petición no puede ser vacío');
    const user = await this.userRepository.existsBy({id});
    if (!user) throw new NotFoundException(`Usuario con id: ${id} no existe en DB`);

    if(rest.fullname) rest.fullname=StringModifiers.toUpperCase(rest.fullname);
    if(rest.lastname) rest.lastname=StringModifiers.toUpperCase(rest.lastname);
    

    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try{
      await qr.manager.update(User, {id}, rest)
      const user= await qr.manager.findOneBy(User,{id}); 
      await qr.commitTransaction();
      await qr.release();
      return  user;
    }catch(e){
      await qr.rollbackTransaction();
      await qr.release();
      handlerDbError(e, this.logger);
    }

  }

  async remove(id: string) {
    const user = await this.userRepository.exists({ where: { id: id } });
    if( !user) throw new BadRequestException(`Usuario con id:${id} no existe`);

    await this.userRepository.update(
      {id:id},
      { isActive: false }
    );
    return true;
  }


  foo(){
    
  }
  

}
