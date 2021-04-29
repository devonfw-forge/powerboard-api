import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoCrudController } from './controllers/userinfo.crud.controller';
import { UserInfo } from './model/entities/userinfo.entity';
import { UserInfoCrudService } from './services/userinfo.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserInfo])],
  providers: [UserInfoCrudService],
  controllers: [UserInfoCrudController],
  exports: [UserInfoCrudService],
})
export class UserInfoModule {}
