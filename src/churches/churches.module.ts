import { Module } from '@nestjs/common';
import { ChurchesService } from './churches.service';
import { ChurchesController } from './churches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Church } from './entities/church.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Church])

  ],
  controllers: [ChurchesController],
  providers: [ChurchesService],
  exports:[ TypeOrmModule]
})
export class ChurchesModule {}
