import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { BusinessUnit } from '../../business-units/model/entities/business-unit.entity';
import { ClientStatusResponse } from '../../client-status/model/dto/ClientStatusResponse';
import { ClientStatusCrudService } from '../../client-status/services/client-status.crud.service';
import { CodeQualityResponse } from '../../code-quality-snapshot/model/dto/CodeQualityResponse';
import { CodeQualitySnapshotCrudService } from '../../code-quality-snapshot/services/code-quality-snapshot.crud.service';
// import { User } from '../../../core/user/model/entities/user.entity';
import { SprintDetailResponse } from '../../sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../team-spirit/model/dto/TeamSpiritResponse';
import { TeamSpiritCrudService } from '../../team-spirit/services/team-spirit.crud.service';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../../sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../sprint/model/dto/VelocityComparisonResponse';
import { SprintCrudService } from '../../sprint/services/sprint.crud.service';
import { BreadCrumbResponse } from '../model/dto/BreadCrumbResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { LoginResponse } from '../model/dto/LoginResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
import { Team } from '../model/entities/team.entity';
import { DailyMeetingResponse } from '../../../daily-links/model/dto/DailyMeetingResponse';
import { DailyMeetingCrudService } from '../../../daily-links/services/daily-meeting.crud.service';
import { TeamLinksCrudService } from '../../../team-links/services/team-links.crud.service';
import { ImagesCrudService } from '../../../multimedia/images/services/images.crud.service';
import { VideosCrudService } from '../../../multimedia/videos/services/videos.crud.service';
import { ElectronBoardResponse } from '../model/dto/ElectronBoardResponse';
import { TeamLinkResponse } from '../../../team-links/model/dto/TeamLinkResponse';
import { ImageResponse } from '../../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../../multimedia/videos/model/dto/VideoResponse';
import { VisibilityCrudService } from '../../../visibility/services/visibility.crud.service';
import { VisibilityResponse } from '../../../visibility/model/dto/VisibilityResponse';

@Injectable()
export class TeamCrudService extends TypeOrmCrudService<Team> {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(BusinessUnit) private readonly businessRepository: Repository<BusinessUnit>,
    // @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly codequalityService: CodeQualitySnapshotCrudService,
    private readonly clientStatusService: ClientStatusCrudService,
    private readonly teamSpiritService: TeamSpiritCrudService,
    private readonly sprintService: SprintCrudService,
    private readonly dailyMeetingService: DailyMeetingCrudService,
    private readonly teamLinkService: TeamLinksCrudService,
    private readonly imageService: ImagesCrudService,
    private readonly videoService: VideosCrudService,
    private readonly visibleService: VisibilityCrudService,
  ) {
    super(teamRepository);
  }

  loginResponse: LoginResponse = {} as LoginResponse;
  chainBU: BreadCrumbResponse = {} as BreadCrumbResponse;
  dash: DashBoardResponse = {} as DashBoardResponse;
  electron_response: ElectronBoardResponse = {} as ElectronBoardResponse;
  /**
   * getPowerboardByUserId method will retrieve all KPI's +breadcrumb + dump_BU
   * @param {userId} userId Takes userId as input
   * @return {LoginResponse} Dashboard + Electron board as well as breadcrumb and dumb BU List
   */
  async getPowerboardByTeamId(teamId: string): Promise<LoginResponse> {
    this.loginResponse.user_breadCrumb = [];
    this.loginResponse.dump_businessUnit = [];
    // const users: User = (await this.userRepository.findOne({ where: { id: userId } })) as User;

    // if (users) {
    const teams: Team = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    this.loginResponse.team_id = teams.id;
    this.loginResponse.team_name = teams.name;
    this.loginResponse.center = teams.business_unit.name;
    this.loginResponse.logo = teams.logo;
    this.dash = await this.getDashboardByTeamId(teams.id);
    this.loginResponse.dashboard = this.dash;
    this.chainBU.bu_name = teams.name;
    this.loginResponse.user_breadCrumb.push(this.chainBU);
    this.chainBU = {} as BreadCrumbResponse;

    this.electron_response = await this.getElectronBoardByTeamId(teams.id);
    this.loginResponse.electron_response = this.electron_response;
    let businessUnitsId = teams.business_unit.id;
    let businessUnitsRootParentId = teams.business_unit.root_parent_id;
    let business: BusinessUnit[] = await this.businessRepository
      .createQueryBuilder('businessUnit')
      .where('businessUnit.root_parent_id=:root_parent_id', { root_parent_id: businessUnitsRootParentId })
      .getMany();
    this.loginResponse.user_breadCrumb = this.getBUOrder(business, businessUnitsId);

    this.loginResponse.user_breadCrumb.reverse();
    this.loginResponse.dump_businessUnit = business;

    return this.loginResponse;
    // } else {
    //   throw new NotFoundException('userId not found');
    // }
  }
  /**
   * getBUOrder method will arrange all BU hierarchy of login user
   * @param {business ,businessUnitsId} ,it takes business[] and businessUnitsId as input
   * @return {BreadCrumbResponse} BreadCrumb array will be returned as response
   */
  getBUOrder(business: BusinessUnit[], businessUnitsId: string): BreadCrumbResponse[] {
    let i,
      nextParentId = '';
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
  async getDashboardByTeamId(teamId: string): Promise<DashBoardResponse> {
    this.dash.teamId = teamId;

    const codeQuality: CodeQualityResponse | undefined = await this.codequalityService.getCodeQualitySnapshot(teamId);
    this.dash.codeQualityResponse = codeQuality;

    const clientStatus: ClientStatusResponse | undefined = await this.clientStatusService.getClientFeedback(teamId);
    this.dash.clientStatusResponse = clientStatus;

    const teamSpirit: TeamSpiritResponse | undefined = await this.teamSpiritService.getTeamSpirit(teamId);
    this.dash.teamSpiritResponse = teamSpirit;

    const burndown: BurndownResponse | undefined = await this.sprintService.getBurndown(teamId);
    this.dash.burndownResponse = burndown;

    const sprintDetail: SprintDetailResponse | undefined = await this.sprintService.getSprintDetailResponse(teamId);
    this.dash.sprintDetailResponse = sprintDetail;
    const velocityComparisonDTO:
      | VelocityComparisonResponse
      | undefined = await this.sprintService.getVelocityComparison(teamId);
    this.dash.velocityResponse = velocityComparisonDTO;
    this.dash.teamStatus = this.fetchStatus(this.dash);
    return this.dash;
  }

  /**
   * getTeamsyBUId method will fetch the list of all teams belong to particular BU
   * @param {Bu_id} Bu_id it takes Business Unit as input
   * @return {TeamResponse[]} list of teams with their status
   */
  async getTeamsByBUId(BU_id: string): Promise<TeamResponse[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { business_unit: BU_id } });
    let teamsResponse: TeamResponse = {} as TeamResponse;
    let teamsDTOArray = [],
      i;
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
   * setLogoPath method will set logo for that team
   * @param {teamId, path} .Takes teamId and path as input
   * @return {Images} Images as response for that team
   */
  async setLogoPath(path: string, teamId: string): Promise<any> {
    const output = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    let team = new Team();
    if (output) {
      team.id = output.id;
    }
    team.logo = path;
    return await this.teamRepository.save(team);
  }
  /**
   * fetchstatus method will fetch the status of all respective KPI's of dashboard
   * @param {dashboard} dashboard takes dashboard object as input
   * @return {number} number as status value
   */
  fetchStatus(dashboard: DashBoardResponse | any): number {
    let statusResult;
    const codeQualityStatus = dashboard.codeQualityResponse.status;
    const teamSpiritStatus = dashboard.teamSpiritResponse.teamSpiritRating;
    const clientStatus = dashboard.clientStatusResponse.clientSatisfactionRating;
    const burndownStatus = dashboard.burndownResponse.burndownStatus;
    if (clientStatus >= 6 && teamSpiritStatus >= 6 && codeQualityStatus == 'PASSED' && burndownStatus == 'Ahead Time') {
      statusResult = 2;
    } else if (
      clientStatus < 6 &&
      teamSpiritStatus < 6 &&
      codeQualityStatus == 'FAILED' &&
      burndownStatus == 'Behind Time'
    ) {
      statusResult = 0;
    } else {
      statusResult = 1;
    }
    return statusResult;
  }
  // board: ElectronBoardResponse = {} as ElectronBoardResponse;
  // async getElectronBoardByUserId(userId: string): Promise<ElectronBoardResponse> {
  //   const users: User = (await this.userRepository.findOne({ where: { id: userId } })) as User;
  //   if (users) {
  //     const teamId = users.teamId.id;
  //     this.board.teamId = teamId;
  //     this.board.center = users.teamId.business_unit.name;
  //     this.board.teamLogo = users.teamId.logo;
  //     const dailyMeeting: DailyMeetingResponse[] = await this.dailyMeetingService.getDailyLinks(teamId);
  //     this.board.dailyMeetingResponse = dailyMeeting;

  //     const teamLink: TeamLinkResponse[] = await this.teamLinkService.getTeamLinks(teamId);
  //     this.board.teamLinkResponse = teamLink;

  //     const images: ImageResponse[] = await this.imageService.getPathOfImage(teamId);
  //     this.board.imageResponse = images;

  //     const videos: VideoResponse[] = await this.videoService.getPathOfVideos(teamId);
  //     this.board.videoResponse = videos;

  //     const visible: VisibilityResponse = await this.visibleService.getVisiblilityForTeam(teamId);
  //     this.board.visibleResponse = visible;
  //     return this.board;
  //   } else {
  //     throw new NotFoundException('userId not found');
  //   }
  // }
  board: ElectronBoardResponse = {} as ElectronBoardResponse;
  async getElectronBoardByTeamId(teamId: string): Promise<ElectronBoardResponse> {
    const dailyMeeting: DailyMeetingResponse[] = await this.dailyMeetingService.getDailyLinks(teamId);
    this.board.dailyMeetingResponse = dailyMeeting;

    const teamLink: TeamLinkResponse[] | undefined = await this.teamLinkService.getTeamLinks(teamId);
    this.board.teamLinkResponse = teamLink;

    const images: ImageResponse[] | undefined = await this.imageService.getPathOfImage(teamId);
    this.board.imageResponse = images;

    const videos: VideoResponse[] | undefined = await this.videoService.getPathOfVideos(teamId);
    this.board.videoResponse = videos;

    const visible: VisibilityResponse | undefined = await this.visibleService.getVisiblilityForTeam(teamId);
    this.board.visibleResponse = visible;
    return this.board;
  }
}
