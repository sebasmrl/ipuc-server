import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ShepherdsModule } from './shepherds/shepherds.module';
import { PositionsModule } from './positions/positions.module';
import { ChurchesModule } from './churches/churches.module';
import { TestModule } from './test/test.module';
import { DirectivesModule } from './directives/directives.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true, 
      synchronize:true, 
    }),
    AuthModule,
    UsersModule,
    ShepherdsModule,
    PositionsModule,
    ChurchesModule,
    TestModule,
    DirectivesModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
