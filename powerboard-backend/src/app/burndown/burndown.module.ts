import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from '../sprint/model/entities/sprint.entity';
import { BurndownCrudController } from './controllers/burndown.crud.controller';
import { Burndown } from './model/entities/burndown.entity';
import { BurndownCrudService } from './services/burndown.crud.services';

@Module({
  imports: [TypeOrmModule.forFeature([Burndown,Sprint])],
  providers: [BurndownCrudService],
  controllers: [BurndownCrudController],
  exports:[BurndownCrudService],
})
export class BurndownModule {}
