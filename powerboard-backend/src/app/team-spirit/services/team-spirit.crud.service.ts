import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse';
import { TeamSpirit } from '../model/entities/team-spirit.entity';

@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(
    @InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>,
    @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>,
  ) {
    super(teamSpiritRepository);
  }
  teamSpiritResponse: TeamSpiritResponse = {} as TeamSpiritResponse;
  /**
   * getTeamSpirit method will fetch the spirit of team
   * @param {teamId} ,Takes teamId as input
   * @return {TeamSpiritResponse} TeamSpirit as response for that team's previous sprint
   */
  async getTeamSpirit(team_Id: number): Promise<TeamSpiritResponse> {
    const sprint = (await this.sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.team_id=:team_id', { team_id: team_Id })
      .orderBy('sprint.sprint_number', 'DESC')
      .skip(1)
      .take(1)
      .getOne()) as Sprint;

    console.log('HIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII');
    console.log(sprint);
    const teamSpirit = (await this.teamSpiritRepository
      .createQueryBuilder('team_spirit')
      .where('team_spirit.sprint_id=:sprint_id', { sprint_id: sprint.id })
      .limit(1)
      .getOne()) as TeamSpirit;

    console.log(teamSpirit);
    // const teamSpirit_1 = await this.teamSpiritRepository.find({ where: { sprint: result?.id }, take: 1 });
    // console.log("Helllllllllllllllllllllooooooooooooooo")
    // console.log(teamSpirit_1);
    this.teamSpiritResponse.teamSpiritRating = teamSpirit.team_spirit_rating;
    this.teamSpiritResponse.sprintNumber = sprint.sprint_number;
    return this.teamSpiritResponse;
  }
}
