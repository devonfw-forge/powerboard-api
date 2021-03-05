import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Repository } from 'typeorm';
import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
import { TeamSpirit } from '../model/entities/team-spirit.entity';


@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(@InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>,
              @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(teamSpiritRepository);
  }
  teamSpiritDTO: TeamSpiritDTO = new TeamSpiritDTO();
  async getTeamSpirit(id: number): Promise<TeamSpiritDTO> {
  
    const result = await this.sprintRepository.createQueryBuilder("sprint")
                                                     .where("sprint.teamId=:teamId" ,{teamId:id})
                                                     .orderBy("sprint.sprintNumber","DESC")
                                                     .skip(1)
                                                     .take(1).getOne();
    const teamSpirit = await this.teamSpiritRepository.createQueryBuilder("team_spirit")
                                              .where("team_spirit.sprintId=:sprintId" ,{sprintId:result!.id})
                                              .limit(1).getOne() as TeamSpirit;
    this.teamSpiritDTO.teamSpiritRating = teamSpirit.teamSpiritRating;
    this.teamSpiritDTO.sprintNumber = result!.sprintNumber;
    return this.teamSpiritDTO;
  }
}
