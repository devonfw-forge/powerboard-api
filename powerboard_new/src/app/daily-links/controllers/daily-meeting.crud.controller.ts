import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { DailyMeetingCrudService } from '../services/daily-meeting.crud.service';
import { DailyMeeting } from '../model/entities/daily-meeting.entity';

@Crud({
  model: {
    type: DailyMeeting,
  },
})
@CrudType(DailyMeeting)
@Controller('daily-meeting')
export class DailyMeetingCrudController {
  constructor(public dailyMeetingService: DailyMeetingCrudService) {}

  @Get('teamId/:id')
  async getDailyMeeting(@Param('id') teamId: number): Promise<any> {
    return await this.dailyMeetingService.getDailyLinks(teamId);
  }
}
