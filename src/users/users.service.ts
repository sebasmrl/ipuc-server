import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { And, DataSource, LessThan, Like, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UpdateUserBySelfDto} from './dto/update-user-by-self.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

import { StringModifiers, handlerDbError } from 'src/common/helpers';
import { UpdateUserByAdmin } from './dto/update-user-by-admin';

@Injectable()
export class UsersService {
  
  private readonly logger = new Logger('UsersService'); 

  constructor(  
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly datasource: DataSource
  ){}

  async create(createUserDto: CreateUserDto):Promise<User> {
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
      where: {...condition},
      skip: skip,
      take:limit
    });

    //positions: {   from: LessThan(new Date()),  to: MoreThan(new Date()) }
    return users;
  }


  async findOne(id: string) {
    return await this.userRepository.findOneBy({id})
  }

  async findOneByFullNameOrLastname(searchTerm:string){
    const user = await this.userRepository.find({
      where: [
        { fullname:  Like(`%${StringModifiers.toUpperCase(searchTerm)}%`)},
      ]
    })

    return user;
  }

  async updateBySelf(id: string, updateUserBySelfDto: UpdateUserBySelfDto) {

    const { positions, church, ...rest } = updateUserBySelfDto;
    if(positions || church) throw new BadRequestException('Los campos (positions) o (church) no se pueden modificar')

    if( Object.keys(rest).length == 0) throw new BadRequestException('El cuerpo de la petición no puede ser vacío');
    const user = await this.userRepository.findOneBy({id});
    if (!user) throw new NotFoundException(`Usuario con id: ${id} no existe en DB`);

    
    //this property must be generate with name and lastname properties
    if(rest.fullname) rest.fullname = user.fullname;

    //necesary validation for filter functionality 
    if(rest.name && rest.lastname){
      rest.name=StringModifiers.toUpperCase(rest.name);
      rest.lastname=StringModifiers.toUpperCase(rest.lastname);
      rest.fullname = `${rest.name} ${rest.lastname}`;
    } else if(rest.name){ 
      rest.name=StringModifiers.toUpperCase(rest.name)
      rest.fullname = `${rest.name} ${user.lastname}`;
    }else if(rest.lastname){
      rest.lastname=StringModifiers.toUpperCase(rest.lastname);
      rest.fullname = `${user.name} ${rest.lastname}`;
    }


    const qr = this.datasource.createQueryRunner();
    await qr.connect();
    await qr.startTransaction();

    try{
      await qr.manager.update(User, {id}, rest)
      //const user= await qr.manager.findOneBy(User,{id}); 
      await qr.commitTransaction();
      await qr.release();
    }catch(e){
      await qr.rollbackTransaction();
      await qr.release();
      handlerDbError(e, this.logger);
    }

    return  {...user, ...rest};

  }

  async updateByAdmin(id: string, updateUserByAdmin: UpdateUserByAdmin){

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


  

}
