import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ShepherdsService } from 'src/shepherds/shepherds.service';
import { RegisterDto } from './dto';
import { JWTPayload } from './interfaces/JwtPayload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersService: UsersService,
    private readonly shepherdService: ShepherdsService,
    private readonly jwtService: JwtService,
  ){}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    let option:string;
    let id:string;
  
    const user =   await  this.usersService.login(email, password);
    if(user) option = "USER";
    
    const shepherd =   await this.shepherdService.login(email, password);
    if(shepherd) option = "SHEPHERD";

    if(!user || !shepherd) throw new UnauthorizedException('Usuario o contraseña son incorrectos');

    id = (user) ? user.id : shepherd.id;
    //TODO: generate Token
    const token  = this.jwtService.sign({id})

    return {
      option,
      token: token 
    } 
  }

  async register(registerDto: RegisterDto) {
    const { id} = await this.usersService.register(registerDto)
    return this.generateJwt({id})
  }


  private generateJwt(payload: JWTPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
  
}
