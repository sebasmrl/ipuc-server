import { Module } from '@nestjs/common';
import { DirectivesService } from './directives.service';
import { DirectivesController } from './directives.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Directive } from './entities/directive.entity';
import { ShepherdsModule } from 'src/shepherds/shepherds.module';


//NOTE: This module is paused for implementation
@Module({
  imports: [
    TypeOrmModule.forFeature([Directive]),
  ],
  controllers: [DirectivesController],
  providers: [DirectivesService],
  exports:[TypeOrmModule]
})
export class DirectivesModule {}
