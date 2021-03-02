import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../model/entities/sprint.entity';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> {
  constructor(@InjectRepository(Sprint) repo: Repository<Sprint>) {
    super(repo);
  }
}
