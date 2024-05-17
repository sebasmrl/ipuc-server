import { Shepherd } from './../../shepherds/entities/shepherd.entity';
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { JWTPayload } from '../interfaces/JwtPayload';
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly shepherdRepository: Repository<Shepherd>,
        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JWTPayload){
        const { id } = payload;
    
        const shepherd  = await this.shepherdRepository.findOneBy({id:id});
        if(shepherd) return shepherd;


        const user  = await this.userRepository.findOneBy({id:id});
        if(user){ 
            if(!user.isActive) throw new UnauthorizedException('User is inactive');   
            return user; 
        }
        
        throw new UnauthorizedException('Token is not valid')    
    }
}