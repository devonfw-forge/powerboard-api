import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from '../../dashboard/dashboard.module';
import { TeamsModule } from '../../teams/teams.module';
import { User } from './model/entities/user.entity';
import { UserInfo } from './model/entities/user_info.entity';
import { UserRole } from './model/entities/user_role.entity';
import { UserTeam } from './model/entities/user_team.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserTeam,UserInfo, UserRole]), DashboardModule, TeamsModule],
  controllers: [],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
