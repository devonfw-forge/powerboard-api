import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/entities/user.entity';
import { UserRole } from './model/entities/user_role.entity';
import { UserTeam } from './model/entities/user_team.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTeam,UserRole])],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
