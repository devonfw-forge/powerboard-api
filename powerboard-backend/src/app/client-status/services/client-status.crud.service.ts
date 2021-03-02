import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ClientStatus } from '../model/entities/client-status.entity';

@Injectable()
export class ClientStatusCrudService extends TypeOrmCrudService<ClientStatus> {
  constructor(@InjectRepository(ClientStatus) repo: Repository<ClientStatus>) {
    super(repo);
  }
}
