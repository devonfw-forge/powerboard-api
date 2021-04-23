import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyMeetingCrudController } from './controllers/daily-meeting.crud.controller';
import { DailyMeeting } from './model/entities/daily-meeting.entity';
import { DailyMeetingCrudService } from './services/daily-meeting.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([DailyMeeting])],
  providers: [DailyMeetingCrudService],
  controllers: [DailyMeetingCrudController],
  exports: [DailyMeetingCrudService],
})
export class DailyMeetingModule {}
