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
import { BurndownDTO } from '../../sprint/model/dto/BurndownDTO';
import { VelocityComparisonDTO } from '../../sprint/model/dto/VelocityComparisonDTO';
import { SprintCrudService } from '../../sprint/services/sprint.crud.service';

import { BreadCrumbDTO } from '../model/dto/BreadCrumbDTO';

import { DashBoardDTO } from '../model/dto/DashBoardDTO';
import { LoginResponseDTO } from '../model/dto/LoginResponseDTO';
import { TeamDTO } from '../model/dto/TeamDTO';

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
    private readonly sprintService: SprintCrudService,
  ) {
    super(teamRepository);
  }

  loginResponse: LoginResponseDTO = new LoginResponseDTO();
  chainBU: BreadCrumbDTO = new BreadCrumbDTO();
  dash: DashBoardDTO = new DashBoardDTO();
  qualityDTO: CodeQualityDTO = new CodeQualityDTO();

  async getDashboardByUserId(userId: number): Promise<LoginResponseDTO> {
    this.loginResponse.user_breadCrumb = [];
    this.loginResponse.dump_businessUnit = [];
    const users: User = (await this.userRepository.findOne({ where: { id: userId } })) as User;

    if (users != null) {
      const teams: Team = (await this.teamRepository.findOne({ where: { id: users?.teamId.id } })) as Team;

      this.loginResponse.dashboard.teamId = teams.id;
      this.loginResponse.dashboard.teamName = teams.name;
      const codeQuality: CodeQualityDTO = (await this.codequalityService.getCodeQualitySnapshot(
        teams.id,
      )) as CodeQualityDTO;
      this.loginResponse.dashboard.codeQualityDTO = codeQuality;

      const clientStatus: ClientStatusDTO = (await this.clientStatusService.getClientFeedback(
        teams.id,
      )) as ClientStatusDTO;
      this.loginResponse.dashboard.clientStatusDTO = clientStatus;

      const burndownDTO: BurndownDTO = (await this.sprintService.getBurndown(teams.id)) as BurndownDTO;
      this.loginResponse.dashboard.burndownDTO = burndownDTO;

      const velocityComparisonDTO: VelocityComparisonDTO = (await this.sprintService.getVelocityComparison(
        teams.id,
      )) as VelocityComparisonDTO;
      this.loginResponse.dashboard.velocityDTO = velocityComparisonDTO;

      const teamSpirit: TeamSpiritDTO = (await this.teamSpiritService.getTeamSpirit(teams.id)) as TeamSpiritDTO;

      this.loginResponse.dashboard.teamSpiritDTO = teamSpirit;
      this.chainBU.bu_name = teams.name;
      this.loginResponse.user_breadCrumb.push(this.chainBU);
      this.chainBU = {} as BreadCrumbDTO;

      let businessUnitsId = teams.business_unit.id;
      let businessUnitsRootParentId = teams.business_unit.root_parent_id;

      // let business:BusinessUnit[]|any =await this.businessRepository.find(businessUnitsRootParentId)
      let business: BusinessUnit[] = await this.businessRepository
        .createQueryBuilder('businessUnit')
        .where('businessUnit.root_parent_id=:root_parent_id', { root_parent_id: businessUnitsRootParentId })
        .getMany();
      let i,
        nextParentId = 0;

      let iterate: Boolean = true;
      while (iterate) {
        for (i = 0; i < business.length; i++) {
          if (businessUnitsId == business[i].id) {
            this.chainBU.bu_id = business[i].id;
            this.chainBU.bu_name = business[i].name;
            this.loginResponse.user_breadCrumb.push(this.chainBU);
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
      this.loginResponse.user_breadCrumb.reverse();
      this.loginResponse.dump_businessUnit = business;
      return this.loginResponse;
    } else {
      throw new NotFoundException('userId not found');
    }
  }

  async getDashboardByTeamId(teamId: number): Promise<DashBoardDTO> {
    this.dash.teamId = teamId;
    const codeQuality: CodeQualityDTO = (await this.codequalityService.getCodeQualitySnapshot(
      teamId,
    )) as CodeQualityDTO;
    this.dash.codeQualityDTO = codeQuality;

    const clientStatus: ClientStatusDTO = (await this.clientStatusService.getClientFeedback(teamId)) as ClientStatusDTO;
    this.dash.clientStatusDTO = clientStatus;

    const teamSpirit: TeamSpiritDTO = (await this.teamSpiritService.getTeamSpirit(teamId)) as TeamSpiritDTO;
    this.dash.teamSpiritDTO = teamSpirit;

    const burndownDTO: BurndownDTO = (await this.sprintService.getBurndown(teamId)) as BurndownDTO;
    this.dash.burndownDTO = burndownDTO;

    const velocityComparisonDTO: VelocityComparisonDTO = (await this.sprintService.getVelocityComparison(
      teamId,
    )) as VelocityComparisonDTO;
    this.dash.velocityDTO = velocityComparisonDTO;

    return this.dash;
  }

  async getTeamsByBUId(BU_id: number): Promise<TeamDTO[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { business_unit: BU_id } });
    console.log(teams);
    let teamsDTO = new TeamDTO();
    let teamsDTOArray = [];
    let i;

    let dashboard = new DashBoardDTO();
    for (i = 0; i < teams.length; i++) {
      teamsDTO.teamId = teams[i].id;
      teamsDTO.teamName = teams[i].name;
      dashboard = (await this.getDashboardByTeamId(teams[i].id)) as DashBoardDTO;
      teamsDTO.status = this.fetchStatus(dashboard);
      teamsDTOArray.push(teamsDTO);
      teamsDTO = {} as TeamDTO;
    }
    return teamsDTOArray;
  }

  fetchStatus(dashboard: DashBoardDTO): number {
    let statusResult;
    const codeQualityStatus = dashboard.codeQualityDTO.status;
    const teamSpiritStatus = dashboard.teamSpiritDTO.teamSpiritRating;
    const clientStatus = dashboard.clientStatusDTO.clientSatisfactionRating;
    const burndownStatus = dashboard.burndownDTO.burndownStatus;

    if (clientStatus >=6 && teamSpiritStatus>=6 && codeQualityStatus=='PASSED' && burndownStatus=='Ahead Time') {
      statusResult = 2;
    }
    else if(clientStatus<6 && teamSpiritStatus<6 && codeQualityStatus=='FAILED' && burndownStatus=='Behind Time')
    {
      statusResult = 0;
    }
    else 
    {
      statusResult = 1;
    }
    return statusResult;
  }
}
