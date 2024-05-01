import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { StringModifiers } from 'src/common/helpers/string-modifiers.helper';

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
      this.handlerDBError(e)
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { skip=0, limit=10, activeRegisters} = paginationDto;
  
    let condition = (activeRegisters == undefined) 
      ? {} 
      : { isActive:activeRegisters}
    
    const users = this.userRepository.find({
      where: condition,
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

    if( Object.keys(rest).length == 0) throw new BadRequestException('El cuerpo de la petición no puede ser vacío');
    const user = await this.userRepository.existsBy({id});
    if (!user) throw new NotFoundException(`Usuario con id: ${id} no existe en DB`);

    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try{
      await qr.manager.update(User, {id}, rest)
      const user= await qr.manager.findOneBy(User,{id}); //TODO: capture from token after
      await qr.commitTransaction();
      await qr.release();
      return  user;
    }catch(e){
      await qr.rollbackTransaction();
      await qr.release();
      this.handlerDBError(e);
    }

  }

  async remove(id: string) {
    const user = await this.userRepository.exists({ where: { id: id } });
    if( !user) throw new BadRequestException(`User with id:${id} does not exist`);

    await this.userRepository.update(
      {id:id},
      { isActive: false }
    );
    return true;
  }

  private handlerDBError(e:any){
    this.logger.error(e.message)
    if(e.code=='23505'){
      this.logger.error(e.detail)
      throw new BadRequestException(e.detail); 
    }
    throw new InternalServerErrorException("Unexpected error, check server logs");
  }

}
