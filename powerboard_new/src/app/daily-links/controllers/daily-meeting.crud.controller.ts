import { Body, Controller, Delete, Get, Param, Post, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Response as eResponse } from 'express';
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
  //@UseGuards(AuthGuard('jwt'))
  async getDailyMeeting(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.dailyMeetingService.getDailyLinks(teamId);
    res.status(200).json(result);
  }

  @Delete('delete/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteDailyMeetingById(@Param('id') dailyMeetingId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.dailyMeetingService.deleteDailyMeetingById(dailyMeetingId);
    console.log(result);
    res.status(200).json({ message: 'Meeting Link successfully Deleted' });
  }

  @Post('teamId/create')
  //@UseGuards(AuthGuard('jwt'))
  async createDailyMeeting(@Body() meetingDTO: DailyMeetingDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.dailyMeetingService.createDailyMeeting(meetingDTO);
    res.status(201).json(result);
  }
}
