import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
import { TeamSpirit } from '../model/entities/team-spirit.entity';

@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(
    @InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>,
    @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>,
  ) {
    super(teamSpiritRepository);
  }
  teamSpiritDTO: TeamSpiritDTO = new TeamSpiritDTO();
  async getTeamSpirit(id: number): Promise<TeamSpiritDTO> {
    const result = await this.sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.team_id=:team_id', { team_id: id })
      .orderBy('sprint.sprint_number', 'DESC')
      .skip(1)
      .take(1)
      .getOne();
    const teamSpirit = (await this.teamSpiritRepository
      .createQueryBuilder('team_spirit')
      .where('team_spirit.sprint_id=:sprint_id', { sprint_id: result!.id })
      .limit(1)
      .getOne()) as TeamSpirit;
    this.teamSpiritDTO.teamSpiritRating = teamSpirit.team_spirit_rating;
    this.teamSpiritDTO.sprintNumber = result!.sprint_number;
    return this.teamSpiritDTO;
  }
}
