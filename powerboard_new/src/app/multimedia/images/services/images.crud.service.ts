import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Images } from '../model/entities/image.entity';

@Injectable()
export class ImagesCrudService extends TypeOrmCrudService<Images> {
  constructor(@InjectRepository(Images) repo: Repository<Images>) {
    super(repo);
  }
}
