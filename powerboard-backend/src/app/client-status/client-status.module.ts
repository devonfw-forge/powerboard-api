import { Module } from '@nestjs/common';
import { ClientStatus } from './model/entities/client-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientStatusCrudService } from './services/client-status.crud.service';
import { ClientStatusCrudController } from './controllers/client-status.crud.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientStatus])],
  providers: [ClientStatusCrudService],
  controllers: [ClientStatusCrudController],
})
export class ClientStatusModule {}
