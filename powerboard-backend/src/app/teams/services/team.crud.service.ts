import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BusinessUnit } from 'src/app/business-units/model/entities/business-unit.entity';
import { ClientStatusDTO } from 'src/app/client-status/model/dto/ClientStatusDTO';
import { ClientStatusCrudService } from 'src/app/client-status/services/client-status.crud.service';
import { CodeQualityDTO } from 'src/app/code-quality-snapshot/model/dto/CodeQualityDTO';
import { CodeQualitySnapshotCrudService } from 'src/app/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { User } from 'src/app/core/user/model/entities/user.entity';
import { TeamSpiritDTO } from 'src/app/team-spirit/model/dto/TeamSpiritDTO';
import { TeamSpiritCrudService } from 'src/app/team-spirit/services/team-spirit.crud.service';
import { Repository } from 'typeorm';
import { BreadCrumbDTO } from '../model/dto/BreadCrumbDTO';
import { CompleteResponseDTO } from '../model/dto/CompleteResponseDTO';
import { DashBoardDTO } from '../model/dto/DashBoardDTO';

import { Team } from '../model/entities/team.entity';

@Injectable()
export class TeamCrudService extends TypeOrmCrudService<Team> {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(BusinessUnit) private readonly businessRepository: Repository<BusinessUnit>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly codequalityService: CodeQualitySnapshotCrudService,
    private readonly clientStatusService: ClientStatusCrudService,
    private readonly teamSpiritService: TeamSpiritCrudService,
  ) {
    super(teamRepository);
  }

  completeResponse: CompleteResponseDTO = new CompleteResponseDTO();
  chainBU: BreadCrumbDTO = new BreadCrumbDTO();
  dash: DashBoardDTO = new DashBoardDTO();
  qualityDTO: CodeQualityDTO = new CodeQualityDTO();
  async getDashboardByUserId(id: number): Promise<CompleteResponseDTO> {
    this.completeResponse.user_breadCrumb = [];
    this.completeResponse.dump_businessUnit = [];
    const users: User = (await this.userRepository.findOne({ where: { id: id } })) as User;
    if (users.id == id) {
      const teams: Team = (await this.teamRepository.findOne({ where: { id: users?.teamId.id } })) as Team;

      const codeQuality: CodeQualityDTO = (await this.codequalityService.getCodeQualitySnapshot(
        teams.id,
      )) as CodeQualityDTO;
      this.completeResponse.dashboard.codeQualityDTO = codeQuality;

      const clientStatus: ClientStatusDTO = (await this.clientStatusService.getClientFeedback(
        teams.id,
      )) as ClientStatusDTO;
      this.completeResponse.dashboard.clientStatusDTO = clientStatus;

      const teamSpirit: TeamSpiritDTO = (await this.teamSpiritService.getTeamSpirit(teams.id)) as TeamSpiritDTO;
      this.completeResponse.dashboard.teamSpiritDTO = teamSpirit;
      this.chainBU.BU_name = teams.name;
      this.completeResponse.user_breadCrumb.push(this.chainBU);
      this.chainBU = {} as BreadCrumbDTO;

      let businessUnitsId = teams.businessUnitId.id;
      let businessUnitsRootParentId = teams.businessUnitId.root_parent_id;

      // let business:BusinessUnit[]|any =await this.businessRepository.find(businessUnitsRootParentId)
      let business: BusinessUnit[] = await this.businessRepository
        .createQueryBuilder('businessUnit')
        .where('businessUnit.root_parent_id=:root_parent_id', { root_parent_id: businessUnitsRootParentId })
        .getMany();
      let i,
        nextParentId = 0;

      //     while(businessUnitsId!=businessUnitsRootParentId){
      //      // iterate =false;
      //     for(i=0 ; i<business.length; i++)   {
      //    if(businessUnitsId==business[i].id){
      //     this.chainBU.BU_id = business[i].id;
      //     this.chainBU.BU_name = business[i].name;
      //     this.dash.user_breadCrumb.push(this.chainBU);
      //     this.chainBU ={} as BreadCrumbDTO;
      //     nextParentId = business[i].parent_id;
      //        }
      //     }
      //     businessUnitsId = nextParentId
      //  }

      let iterate: Boolean = true;
      while (iterate) {
        for (i = 0; i < business.length; i++) {
          if (businessUnitsId == business[i].id) {
            this.chainBU.BU_id = business[i].id;
            this.chainBU.BU_name = business[i].name;
            this.completeResponse.user_breadCrumb.push(this.chainBU);
            this.chainBU = {} as BreadCrumbDTO;
            nextParentId = business[i].parent_id;
            if (business[i].parent_id == business[i].id) {
              iterate = false;
              break;
            }
          }
        }
        businessUnitsId = nextParentId;
      }
      this.completeResponse.user_breadCrumb.reverse();
      this.completeResponse.dump_businessUnit = business;
      return this.completeResponse;
    } else {
      throw new NotFoundException('userId not found');
    }
  }
}
