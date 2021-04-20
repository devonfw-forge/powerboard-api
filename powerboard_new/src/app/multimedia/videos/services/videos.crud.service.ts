import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Videos } from '../model/entities/videos.entity';

@Injectable()
export class VideosCrudService extends TypeOrmCrudService<Videos> {
  constructor(@InjectRepository(Videos) repo: Repository<Videos>) {
    super(repo);
  }
}
