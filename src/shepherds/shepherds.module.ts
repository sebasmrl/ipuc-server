import { Module } from '@nestjs/common';
import { ShepherdsService } from './shepherds.service';
import { ShepherdsController } from './shepherds.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shepherd } from './entities/shepherd.entity';
import { DirectivesModule } from 'src/directives/directives.module';
import { ChurchesModule } from 'src/churches/churches.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Shepherd]),
  ],
  controllers: [ShepherdsController],
  providers: [ShepherdsService],
  exports: [ TypeOrmModule, ShepherdsService]
})
export class ShepherdsModule {}
