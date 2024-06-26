import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShepherdsModule } from 'src/shepherds/shepherds.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    UsersModule, ShepherdsModule, TypeOrmModule,
    PassportModule.register({ defaultStrategy:'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async( configService:ConfigService)=> {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {  expiresIn:'2h' }
        }
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
