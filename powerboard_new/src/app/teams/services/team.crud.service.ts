import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClientStatusResponse } from '../../dashboard/client-status/model/dto/ClientStatusResponse';
import { ClientStatusCrudService } from '../../dashboard/client-status/services/client-status.crud.service';
import { CodeQualityResponse } from '../../dashboard/code-quality-snapshot/model/dto/CodeQualityResponse';
import { CodeQualitySnapshotCrudService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { SprintDetailResponse } from '../../dashboard/sprint/model/dto/SprintDetailResponse';
import { TeamSpiritResponse } from '../../dashboard/team-spirit-integration/model/dto/TeamSpiritResponse';
import { TeamSpiritCrudService } from '../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../../dashboard/sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../dashboard/sprint/model/dto/VelocityComparisonResponse';
import { SprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
import { Team } from '../model/entities/team.entity';
import { DailyMeetingResponse } from '../../daily-links/model/dto/DailyMeetingResponse';
import { DailyMeetingCrudService } from '../../daily-links/services/daily-meeting.crud.service';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';
import { ImagesCrudService } from '../../multimedia/images/services/images.crud.service';
import { VideosCrudService } from '../../multimedia/videos/services/videos.crud.service';
import { ElectronBoardResponse } from '../model/dto/ElectronBoardResponse';
import { TeamLinkResponse } from '../../team-links/model/dto/TeamLinkResponse';
import { ImageResponse } from '../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../multimedia/videos/model/dto/VideoResponse';
import { VisibilityCrudService } from '../../visibility/services/visibility.crud.service';
import { VisibilityResponse } from '../../visibility/model/dto/VisibilityResponse';

import { ViewTeamsResponse } from '../model/dto/ViewTeamsResponse';
import { AddTeam } from 'src/app/shared/interfaces/addTeam.interface';
import { ADCenter } from '../../dashboard/ad-center/model/entities/ad-center.entity';
import { TeamsInADC } from '../model/dto/TeamsInADC';
import { PowerboardResponse } from '../model/dto/PowerboardResponse';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { UserService } from 'src/app/core/user/services/user.service';

@Injectable()
export class TeamCrudService extends TypeOrmCrudService<Team> {
  constructor(
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    @InjectRepository(ADCenter) readonly centerRepository: Repository<ADCenter>,
    private readonly codequalityService: CodeQualitySnapshotCrudService,
    private readonly clientStatusService: ClientStatusCrudService,
    private readonly teamSpiritService: TeamSpiritCrudService,
    private readonly sprintService: SprintCrudService,
    private readonly dailyMeetingService: DailyMeetingCrudService,
    private readonly teamLinkService: TeamLinksCrudService,
    private readonly imageService: ImagesCrudService,
    private readonly videoService: VideosCrudService,
    private readonly userService: UserService,
    private readonly visibleService: VisibilityCrudService,
  ) {
    super(teamRepository);
  }

  powerboardResponse: PowerboardResponse = {} as PowerboardResponse;
  dash: DashBoardResponse = {} as DashBoardResponse;
  electron_response: ElectronBoardResponse = {} as ElectronBoardResponse;
  /**
   * getPowerboardByUserId method will retrieve all KPI's +breadcrumb + dump_BU
   * @param {userId} userId Takes userId as input
   * @return {LoginResponse} Dashboard + Electron board as well as breadcrumb and dumb BU List
   */
  async getPowerboardByTeamId(userTeam: UserTeamDTO): Promise<PowerboardResponse> {
    // const users: User = (await this.userRepository.findOne({ where: { id: userId } })) as User;

    // if (users) {
    const teamId = userTeam.teamId;
    const userId = userTeam.userId;
    const teams: Team = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    this.powerboardResponse.team_id = teams.id;
    this.powerboardResponse.team_name = teams.name;
    this.powerboardResponse.center = teams.ad_center.name;
    this.powerboardResponse.team_code = teams.teamCode;
    this.powerboardResponse.logo = teams.logo;
    const accessRole = await this.userService.getAccessRole(userId, teamId);
    this.powerboardResponse.accessRole = accessRole;
    this.dash = await this.getDashboardByTeamId(teams.id);
    this.powerboardResponse.dashboard = this.dash;
    const myRole = await this.userService.myRole(userId);
    console.log(myRole);
    this.electron_response = await this.getElectronBoardByTeamId(teams.id);
    this.powerboardResponse.electron_response = this.electron_response;

    return this.powerboardResponse;
    // } else {
    //   throw new NotFoundException('userId not found');
    // }
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
    console.log(this.dash);
    this.dash.teamStatus = this.fetchStatus(this.dash);
    console.log(this.dash.teamStatus);
    return this.dash;
  }

  /**
   * getTeamsyBUId method will fetch the list of all teams belong to particular BU
   * @param {Bu_id} Bu_id it takes Business Unit as input
   * @return {TeamResponse[]} list of teams with their status
   */
  async getTeamsByCenterId(CenterId: string): Promise<TeamResponse[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { ad_center: CenterId } });
    console.log(teams);
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
  fetchStatus(dashboard: DashBoardResponse): number | undefined {
    if (dashboard?.clientStatusResponse == null) {
      return undefined;
    } else {
      let statusResult;
      const codeQualityStatus = dashboard!.codeQualityResponse!.status;
      const teamSpiritStatus = dashboard!.teamSpiritResponse!.teamSpiritRating;
      const clientStatus = dashboard!.clientStatusResponse!.clientSatisfactionRating;
      const burndownStatus = dashboard!.burndownResponse!.burndownStatus;
      if (
        clientStatus >= 6 &&
        teamSpiritStatus >= 6 &&
        codeQualityStatus == 'PASSED' &&
        burndownStatus == 'Ahead Time'
      ) {
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
  }

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

  /**
   * addTeam method will add team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async addTeam(addteam: AddTeam): Promise<any> {
    const value = addteam.teamCode;
    const result = await this.teamRepository.findOne({ where: { teamCode: value } });
    if (result != null) {
      console.log('team exists');
    } else {
      let team = new Team();
      team.name = addteam.name;
      team.teamCode = addteam.teamCode;
      team.projectKey = addteam.projectKey;
      console.log(team.teamCode);
      team.logo = addteam.logo!;
      team.ad_center = addteam.ad_center;
      return await this.teamRepository.save(team);
    }
  }

  /**
   * deleteTeamById method will delete team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {void}
   */
  async deleteTeamById(teamId: string): Promise<any> {
    await this.teamRepository.delete(teamId);
  }

  /**
   * getAllTeams method will fetch all team , and system admin can do so
   * @param {} .Takes nothing as input
   * @return {team[]} return team array as response
   */
  async getAllTeams(): Promise<ViewTeamsResponse[]> {
    const teamList = await this.teamRepository.find();
    let viewTeamsResponse: ViewTeamsResponse = {} as ViewTeamsResponse;
    let viewteamList = [],
      i;
    for (i = 0; i < teamList.length; i++) {
      viewTeamsResponse.teamId = teamList[i].id;
      viewTeamsResponse.teamName = teamList[i].name;
      viewTeamsResponse.projectCode = teamList[i].teamCode;
      viewTeamsResponse.adCenter = teamList[i].ad_center.name;
      viewteamList.push(viewTeamsResponse);
      viewTeamsResponse = {} as ViewTeamsResponse;
    }
    return viewteamList;
  }

  /**
   * updateTeam method will update exsiting team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async updateTeam(updateTeam: AddTeam): Promise<any> {
    const value = updateTeam.teamCode;
    const result = await this.teamRepository.findOne({ where: { teamCode: value } });
    let team = new Team();
    if (result) {
      team.id = result.id;
    }
    team.name = updateTeam.name;
    team.teamCode = updateTeam.teamCode;
    team.projectKey = updateTeam.projectKey;
    team.logo = updateTeam.logo!;
    team.ad_center = updateTeam.ad_center;
    return await this.teamRepository.save(team);
  }

  async viewTeamsInADC(teamId: string) {
    const result = await this.teamRepository.findOne({ where: { id: teamId } });
    const teamList = await this.teamRepository.find({ where: { ad_center: result?.ad_center } });
    let viewTeamsInADC: TeamsInADC = {} as TeamsInADC;
    let adcTeamList = [],
      i;
    for (i = 0; i < teamList.length; i++) {
      viewTeamsInADC.teamId = teamList[i].id;
      viewTeamsInADC.teamName = teamList[i].name;
      this.dash = (await this.getDashboardByTeamId(teamList[i].id)) as DashBoardResponse;
      viewTeamsInADC.teamStatus = this.fetchStatus(this.dash);
      adcTeamList.push(viewTeamsInADC);
      viewTeamsInADC = {} as TeamsInADC;
    }
    return adcTeamList;
  }
}
