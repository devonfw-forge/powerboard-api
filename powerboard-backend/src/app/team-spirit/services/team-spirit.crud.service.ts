import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
import { TeamSpirit } from '../model/entities/team-spirit.entity';

@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(@InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>) {
    super(teamSpiritRepository);
  }
  teamSpiritDTO: TeamSpiritDTO = new TeamSpiritDTO();
  async getTeamSpirit(id: number): Promise<TeamSpiritDTO> {
    const result = (await this.teamSpiritRepository
      .createQueryBuilder('team_spirit')
      .where('team_spirit.teamId=:teamId', { teamId: id })
      .orderBy('team_spirit.sprintNumber', 'DESC')
      .limit(1)
      .getOne()) as TeamSpirit;
    this.teamSpiritDTO.teamSpiritRating = result.teamSpiritRating;
    this.teamSpiritDTO.sprintNumber = result.sprintNumber;
    return this.teamSpiritDTO;
  }
}
