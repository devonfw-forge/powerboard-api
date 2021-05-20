import { Module } from '@nestjs/common';
//import { ScheduleModule } from '@nestjs/schedule/dist/schedule.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DailyMeetingModule } from './daily-links/daily-meeting.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ImagessModule } from './multimedia/images/images.module';
import { VideosModule } from './multimedia/videos/videos.module';
import { TeamLinksModule } from './team-links/team-links.module';
import { VisibilityModule } from './visibility/visibility.module';

@Module({
  imports: [
    //ScheduleModule.forRoot(),
    CoreModule,
    DashboardModule,
    DailyMeetingModule,
    TeamLinksModule,
    VideosModule,
    ImagessModule,
    VisibilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
