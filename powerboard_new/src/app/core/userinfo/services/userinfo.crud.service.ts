import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from '../model/entities/userinfo.entity';

@Injectable()
export class UserInfoCrudService extends TypeOrmCrudService<UserInfo> {
  constructor(@InjectRepository(UserInfo) userInfoRepository: Repository<UserInfo>) {
    super(userInfoRepository);
  }
}
