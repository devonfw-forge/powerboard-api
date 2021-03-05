import { Module } from '@nestjs/common';
import { ClientStatus } from './model/entities/client-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusCrudService } from './services/client-status.crud.service';
import { ClientStatusCrudController } from './controllers/client-status.crud.controller';
import { Sprint } from '../sprint/model/entities/sprint.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientStatus,Sprint])],
  providers: [ClientStatusCrudService],
  controllers: [ClientStatusCrudController],
  exports :[ClientStatusCrudService],
})
export class ClientStatusModule {}
