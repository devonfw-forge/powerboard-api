import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TeamLinkResponse } from '../model/dto/TeamLinkResponse';
import { TeamLinks } from '../model/entities/team-links.entity';

@Injectable()
export class TeamLinksCrudService extends TypeOrmCrudService<TeamLinks> {
  constructor(@InjectRepository(TeamLinks) private readonly teamLinkRepository: Repository<TeamLinks>) {
    super(teamLinkRepository);
  }

  /**
   * getTeamLinks method will fetch the links of team
   * @param {teamId} .Takes teamId as input
   * @return {TeamLinkResponse} Team Links as response for that team
   */
  teamLinkResponse: TeamLinkResponse = {} as TeamLinkResponse;
  async getTeamLinks(team_Id: number): Promise<TeamLinkResponse[]> {
    const result = (await this.teamLinkRepository
      .createQueryBuilder('team_link')
      .where('team_link.team_id=:team_id', { team_id: team_Id })
      .getMany()) as TeamLinks[];
    console.log(result);
    let i = 0;
    let teamsDTOArray = [];
    for (i = 0; i < result.length; i++) {
      this.teamLinkResponse.teamLinkId = result[i].id;
      this.teamLinkResponse.title = result[i].title;
      this.teamLinkResponse.links = result[i].link;
      teamsDTOArray.push(this.teamLinkResponse);
      this.teamLinkResponse = {} as TeamLinkResponse;
    }
    return teamsDTOArray;
  }

  async deleteTeamLinkById(teamLinkId: number): Promise<any> {
    return await this.teamLinkRepository.delete(teamLinkId);
  }
}
