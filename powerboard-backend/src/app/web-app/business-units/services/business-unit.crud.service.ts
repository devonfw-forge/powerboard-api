import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BusinessUnit } from '../model/entities/business-unit.entity';

@Injectable()
export class BusinessUnitCrudService extends TypeOrmCrudService<BusinessUnit> {
  constructor(@InjectRepository(BusinessUnit) repo: Repository<BusinessUnit>) {
    super(repo);
  }
}
