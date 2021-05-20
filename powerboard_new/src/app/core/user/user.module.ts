import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';
import { UserTeam } from './model/entities/user_team.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTeam])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
