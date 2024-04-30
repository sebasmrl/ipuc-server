import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { StringModifiers } from 'src/common/helpers/string-modifiers.helper';

@Injectable()
export class UsersService {
  
  private readonly logger = new Logger('UsersService'); 

  constructor(  
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const nUser = this.userRepository.create(createUserDto);
      const user = await this.userRepository.save(nUser);
      return user;
    }catch(e){
      this.dbHandlerError(e)
    }
  }

  findAll(paginationDto: PaginationDto) {

    const { skip=0, limit=10, activeRegisters} = paginationDto;
  
    let condition = (activeRegisters == undefined) 
      ? {} 
      : { isActive:activeRegisters}
    
    const users = this.userRepository.find({
      //select: {id:true, fullname:true },
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

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if( !user) throw new BadRequestException(`User with id:${id} does not exist`);

    const { church, positions, ...rest } = user;

    return this.userRepository.update({id:id},
      {
        ...rest,
        isActive: false
      });
  }

  private dbHandlerError(e:any){
    if(e.code=='23505'){
      this.logger.error(e.detail)
      throw new BadRequestException(e.detail); 
    }
  }

}
