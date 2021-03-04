import { Module } from '@nestjs/common';
import { Sprint } from './model/entities/sprint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintCrudService } from './services/sprint.crud.service';
import { SprintCrudController } from './controllers/sprint.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  providers: [SprintCrudService],
  controllers: [SprintCrudController],
  exports:[SprintCrudService]
})
export class SprintModule {}
