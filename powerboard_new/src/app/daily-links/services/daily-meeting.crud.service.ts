import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { DailyMeetingDTO } from '../model/dto/DailyMeetingDTO';
import { DailyMeetingResponse } from '../model/dto/DailyMeetingResponse';
import { DailyMeeting } from '../model/entities/daily-meeting.entity';

@Injectable()
export class DailyMeetingCrudService extends TypeOrmCrudService<DailyMeeting> {
  constructor(@InjectRepository(DailyMeeting) private readonly dailyLinkRepository: Repository<DailyMeeting>) {
    super(dailyLinkRepository);
  }

  /**
   * getCodeQuality method will fetch the quality of code
   * @param {teamId} .Takes teamId as input
   * @return {DailyMeetingResponse} Daily Link as response for that team
   */
  meetingResponse: DailyMeetingResponse = {} as DailyMeetingResponse;
  async getDailyLinks(team_Id: string): Promise<DailyMeetingResponse[]> {
    const result = (await this.dailyLinkRepository
      .createQueryBuilder('daily_link')
      .where('daily_link.daily_team_id=:team_id', { team_id: team_Id })
      .getMany()) as DailyMeeting[];
    console.log(result);

    let i = 0;
    let dailyMeetingArray = [];
    for (i = 0; i < result.length; i++) {
      this.meetingResponse.type = result[i].type;
      this.meetingResponse.links = result[i].dailyMeetingLink;
      dailyMeetingArray.push(this.meetingResponse);
      this.meetingResponse = {} as DailyMeetingResponse;
    }
    return dailyMeetingArray;
  }

  async createDailyMeeting(meetingDTO: DailyMeetingDTO): Promise<DailyMeeting> {
    let daily = new DailyMeeting();
    daily.type = meetingDTO.type;
    daily.dailyMeetingLink = meetingDTO.links;
    daily.team = meetingDTO.teamId;
    return await this.dailyLinkRepository.save(daily);
  }
}
