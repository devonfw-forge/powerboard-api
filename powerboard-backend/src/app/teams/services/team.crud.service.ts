import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BusinessUnit } from 'src/app/business-units/model/entities/business-unit.entity';
import { ClientStatusResponse } from 'src/app/client-status/model/dto/ClientStatusResponse';
import { ClientStatusCrudService } from 'src/app/client-status/services/client-status.crud.service';
import { CodeQualityResponse } from 'src/app/code-quality-snapshot/model/dto/CodeQualityResponse';
import { CodeQualitySnapshotCrudService } from 'src/app/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { User } from 'src/app/core/user/model/entities/user.entity';
import { SprintDetailResponse } from 'src/app/sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from 'src/app/team-spirit/model/dto/TeamSpiritResponse';
import { TeamSpiritCrudService } from 'src/app/team-spirit/services/team-spirit.crud.service';
import { Repository } from 'typeorm';
import {BurndownResponse } from '../../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../sprint/model/dto/VelocityComparisonResponse';
import { SprintCrudService } from '../../sprint/services/sprint.crud.service';
import { BreadCrumbResponse } from '../model/dto/BreadCrumbResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { LoginResponse } from '../model/dto/LoginResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
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

  loginResponse: LoginResponse ={} as LoginResponse
  chainBU: BreadCrumbResponse={} as BreadCrumbResponse
  dash: DashBoardResponse={} as DashBoardResponse

  /**
  * getDashboardByUserId method will retrieve all KPI's +breadcrumb + dump_BU
  * @param {userId} userId Takes userId as input
  * @return {LoginResponse} Dashboard as well as breadcrumb and dumb BU List
  */
  async getDashboardByUserId(userId: number): Promise<LoginResponse> {
    this.loginResponse.user_breadCrumb = [];
    this.loginResponse.dump_businessUnit = [];
    const users: User = (await this.userRepository.findOne({ where: { id: userId } })) as User;
    if (users != null) {
      const teams: Team = (await this.teamRepository.findOne({ where: { id: users?.teamId.id } })) as Team;
      this.dash = await this.getDashboardByTeamId(teams.id);
      this.loginResponse.dashboard = this.dash;
      this.chainBU.bu_name = teams.name;
      this.loginResponse.user_breadCrumb.push(this.chainBU);
      this.chainBU = {} as BreadCrumbResponse;
 
      let businessUnitsId = teams.business_unit.id;
      let businessUnitsRootParentId = teams.business_unit.root_parent_id;
      let business: BusinessUnit[] = await this.businessRepository
        .createQueryBuilder('businessUnit')
        .where('businessUnit.root_parent_id=:root_parent_id', { root_parent_id: businessUnitsRootParentId })
        .getMany();
         this.loginResponse.user_breadCrumb = this.getBUOrder(business , businessUnitsId);
      // let i, nextParentId = 0;
      // let iterate: Boolean = true;
      // while (iterate) {
      //   for (i = 0; i < business.length; i++) {
      //     if (businessUnitsId == business[i].id) {
      //       this.chainBU.bu_id = business[i].id;
      //       this.chainBU.bu_name = business[i].name;
      //       this.loginResponse.user_breadCrumb.push(this.chainBU);
      //       this.chainBU = {} as BreadCrumbResponse;
      //       nextParentId = business[i].parent_id;
      //       if (business[i].parent_id == business[i].id) {
      //         iterate = false;
      //         break;
      //       }
      //     }
      //   }
      //   businessUnitsId = nextParentId;
      // }
      this.loginResponse.user_breadCrumb.reverse();
      this.loginResponse.dump_businessUnit = business;
      return this.loginResponse;
    } else {
      throw new NotFoundException('userId not found');
    }
  }
   /**
  * getBUOrder method will arrange all BU hierarchy of login user
  * @param {business ,businessUnitsId} ,it takes business[] and businessUnitsId as input
  * @return {BreadCrumbResponse} BreadCrumb array will be returned as response
  */
      getBUOrder(business:BusinessUnit[], businessUnitsId:number):BreadCrumbResponse[]{
        let i, nextParentId = 0;
        let iterate: Boolean = true;
        while (iterate) {
          for (i = 0; i < business.length; i++) {
            if (businessUnitsId == business[i].id) {
              this.chainBU.bu_id = business[i].id;
              this.chainBU.bu_name = business[i].name;
              this.loginResponse.user_breadCrumb.push(this.chainBU);
              this.chainBU = {} as BreadCrumbResponse;
              nextParentId = business[i].parent_id;
              if (business[i].parent_id == business[i].id) {
                iterate = false;
                break;
              }
            }
          }
          businessUnitsId = nextParentId;
        }
        return this.loginResponse.user_breadCrumb;
      }

  /**
  * getDashboardByTeamId method will retrieve all KPI's of particular team
  * @param {teamId} teamId Takes teamId as input
  * @return {DashBoardResponse} . Dashboard with all KPI's
  */
  async getDashboardByTeamId(teamId: number): Promise<DashBoardResponse> {
    this.dash.teamId = teamId;
    
    const codeQuality: CodeQualityResponse = (await this.codequalityService.getCodeQualitySnapshot(teamId));
    this.dash.codeQualityResponse = codeQuality;

    const clientStatus:ClientStatusResponse = (await this.clientStatusService.getClientFeedback(teamId)) ;
    this.dash.clientStatusResponse= clientStatus;

    const teamSpirit:TeamSpiritResponse= (await this.teamSpiritService.getTeamSpirit(teamId));
    this.dash.teamSpiritResponse = teamSpirit;

    const burndown: BurndownResponse = (await this.sprintService.getBurndown(teamId));
    this.dash.burndownResponse = burndown;

    const sprintDetail:SprintDetailResponse = await this.sprintService.getSprintDetailResponse(teamId)
    this.dash.sprintDetailResponse = sprintDetail
    const velocityComparisonDTO: VelocityComparisonResponse = (await this.sprintService.getVelocityComparison(teamId));
    this.dash.velocityResponse = velocityComparisonDTO;
    this.dash.teamStatus = this.fetchStatus(this.dash);
    return this.dash;
  }

   /**
  * getTeamsyBUId method will fetch the list of all teams belong to particular BU
  * @param {Bu_id} Bu_id it takes Business Unit as input
  * @return {TeamResponse[]} list of teams with their status
  */
  async getTeamsByBUId(BU_id: number): Promise<TeamResponse[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { business_unit: BU_id } });
    let teamsResponse :TeamResponse= {} as TeamResponse
    let teamsDTOArray = [], i;
    for (i = 0; i < teams.length; i++) {
      teamsResponse.teamId = teams[i].id;
      teamsResponse.teamName = teams[i].name;
      this.dash = (await this.getDashboardByTeamId(teams[i].id)) as DashBoardResponse;
      teamsResponse.status = this.fetchStatus(this.dash);
      teamsDTOArray.push(teamsResponse);
      teamsResponse = {} as TeamResponse;
    }
    return teamsDTOArray;
  }


  /**
  * fetchstatus method will fetch the status of all respective KPI's of dashboard
  * @param {dashboard} dashboard takes dashboard object as input
  * @return {number} number as status value
  */
  fetchStatus(dashboard: DashBoardResponse): number {
    let statusResult;
    const codeQualityStatus = dashboard.codeQualityResponse.status;
    const teamSpiritStatus = dashboard.teamSpiritResponse.teamSpiritRating;
    const clientStatus = dashboard.clientStatusResponse.clientSatisfactionRating;
    const burndownStatus = dashboard.burndownResponse.burndownStatus;
    if (clientStatus >=6 && teamSpiritStatus>=6 && codeQualityStatus=='PASSED' && burndownStatus=='Ahead Time') {
      statusResult = 2;
    } else if(clientStatus<6 && teamSpiritStatus<6 && codeQualityStatus=='FAILED' && burndownStatus=='Behind Time'){
      statusResult = 0;
    } else {
      statusResult = 1;
    }
    return statusResult;
  }
}
