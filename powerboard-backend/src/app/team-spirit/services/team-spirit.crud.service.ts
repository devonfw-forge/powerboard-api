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
    const teamSpiritResult = await this.teamSpiritRepository.find({ where: { teamId: id } });
    this.teamSpiritDTO.teamSpiritRating = teamSpiritResult[0].teamSpiritRating;
    this.teamSpiritDTO.sprintNumber = teamSpiritResult[0].sprintId.sprintNumber;
    return this.teamSpiritDTO;
  }
}
