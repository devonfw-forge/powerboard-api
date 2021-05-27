import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { TeamsModule } from '../../teams/teams.module';
import { UserModule } from '../user/user.module';
import { TeamSpiritModule } from '../../dashboard/team-spirit-integration/team-spirit.module';

@Module({
  imports: [TeamsModule, UserModule, TeamSpiritModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
