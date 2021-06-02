import { Module } from '@nestjs/common';
import { Team } from './model/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamCrudService } from './services/team.crud.service';
import { TeamCrudController } from './controllers/team.crud.controller';
import { ImagesModule } from '../multimedia/images/images.module';
import { VideosModule } from '../multimedia/videos/videos.module';
import { VisibilityModule } from '../visibility/visibility.module';
import { TeamLinksModule } from '../team-links/team-links.module';
import { DailyMeetingModule } from '../daily-links/daily-meeting.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ADCenter } from '../dashboard/ad-center/model/entities/ad-center.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, ADCenter]),
    DashboardModule,
    ImagesModule,
    VideosModule,
    VisibilityModule,
    TeamLinksModule,
    DailyMeetingModule,
  ],
  providers: [TeamCrudService],
  controllers: [TeamCrudController],
  exports: [TeamCrudService],
})
export class TeamsModule {}
