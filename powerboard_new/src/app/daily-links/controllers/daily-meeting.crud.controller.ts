import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { DailyMeetingCrudService } from '../services/daily-meeting.crud.service';
import { DailyMeeting } from '../model/entities/daily-meeting.entity';
import { DailyMeetingDTO } from '../model/dto/DailyMeetingDTO';
//import { AuthGuard } from '@nestjs/passport';

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
  async getDailyMeeting(@Param('id') teamId: string): Promise<any> {
    return await this.dailyMeetingService.getDailyLinks(teamId);
  }

  @Delete('delete/:id')
  async deleteDailyMeetingById(@Param('id') dailyMeetingId: string): Promise<any> {
    return await this.dailyMeetingService.deleteDailyMeetingById(dailyMeetingId);
  }

  @Post('teamId/create')
  //@UseGuards(AuthGuard('jwt'))
  async createDailyMeeting(@Body() meetingDTO: DailyMeetingDTO): Promise<any> {
    return await this.dailyMeetingService.createDailyMeeting(meetingDTO);
  }
}
