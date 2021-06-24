import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ClientStatusResponse } from '../../dashboard/client-status/model/dto/ClientStatusResponse';
import { ClientStatusCrudService } from '../../dashboard/client-status/services/client-status.crud.service';
import { CodeQualityResponse } from '../../dashboard/code-quality-snapshot/model/dto/CodeQualityResponse';
import { CodeQualitySnapshotCrudService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { SprintDetailResponse } from '../../dashboard/sprint/model/dto/SprintDetailResponse';
//import { TeamSpiritResponse } from '../../dashboard/team-spirit-integration/model/dto/TeamSpiritResponse';
//import { TeamSpiritCrudService } from '../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../../dashboard/sprint/model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../../dashboard/sprint/model/dto/VelocityComparisonResponse';
import { SprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { Team } from '../model/entities/team.entity';
import { DailyMeetingResponse } from '../../daily-links/model/dto/DailyMeetingResponse';
import { DailyMeetingCrudService } from '../../daily-links/services/daily-meeting.crud.service';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';
import { ImagesCrudService } from '../../multimedia/images/services/images.crud.service';
import { VideosCrudService } from '../../multimedia/videos/services/videos.crud.service';
//import { TeamLinkResponse } from '../../team-links/model/dto/TeamLinkResponse';
import { ImageResponse } from '../../multimedia/images/model/dto/ImageResponse';
import { VideoResponse } from '../../multimedia/videos/model/dto/VideoResponse';
import { ViewTeamsResponse } from '../model/dto/ViewTeamsResponse';
import { AddTeam } from 'src/app/shared/interfaces/addTeam.interface';
import { ADCenter } from '../../dashboard/ad-center/model/entities/ad-center.entity';
import { TeamsInADC } from '../model/dto/TeamsInADC';
import { PowerboardResponse } from '../model/dto/PowerboardResponse';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { MyCenter } from '../model/dto/MyCenter';
import { UserService } from 'src/app/core/user/services/user.service';
import { TeamLinkResponse } from '../../team-links/model/dto/TeamLinkResponse';
import { TeamSpiritResponse } from '../../dashboard/team-spirit-integration/model/dto/TeamSpiritResponse';
import { TeamSpiritCrudService } from '../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { TeamSpiritUserDTO } from '../../dashboard/team-spirit-integration/model/dto/TeamSpiritUserDTO';
import { TeamDTO } from '../../dashboard/team-spirit-integration/model/dto/TeamDTO';
import { UpdateTeam } from '../model/dto/updateTeam.interface';

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
  ) {
    super(teamRepository);
  }

  powerboardResponse: PowerboardResponse = {} as PowerboardResponse;
  dash: DashBoardResponse = {} as DashBoardResponse;
  /**
   * getPowerboardByUserId method will retrieve all KPI's +breadcrumb + dump_BU
   * @param {userId,teamId} userId and TeamIdTakes userId as input
   * @return {PowerboardResponse} Dashboard + Electron board as well as breadcrumb and dumb BU List
   */
  async getPowerboardByTeamId(userTeam: UserTeamDTO): Promise<PowerboardResponse> {
    const teamId = userTeam.teamId;
    const userId = userTeam.userId;
    const teams: Team = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    if (!teams) {
      throw new NotFoundException('Team not found');
    }
    const isAdminOrGuest = await this.userService.isAdminOrGuest(userId);
    const privilegeList = await this.userService.getTeamPrivileges(userId, teamId, isAdminOrGuest);
    return this.getPowerboardResponseForTeam(teams, privilegeList, isAdminOrGuest);
  }
  /**
   * getPowerboardResponseForTeam method will return powerboard response realted to team
   */
  async getPowerboardResponseForTeam(
    teams: Team,
    privilegeList: string[],
    isAdminOrGuest: boolean,
  ): Promise<PowerboardResponse> {
    this.powerboardResponse.team_id = teams.id;
    this.powerboardResponse.team_name = teams.name;
    this.powerboardResponse.center = teams.ad_center.name;
    this.powerboardResponse.team_code = teams.teamCode;
    this.powerboardResponse.logo = teams.logo;
    this.powerboardResponse.dashboard = await this.getDashboardByTeamId(teams.id);
    this.powerboardResponse = await this.getOtherComponentsDetailByTeamId(
      teams.id,
      privilegeList,
      this.powerboardResponse,
    );
    if (isAdminOrGuest) {
      this.powerboardResponse.privileges = [];
    } else {
      this.powerboardResponse.privileges = privilegeList;
    }
    return this.powerboardResponse;
  }

  /**
   * getDashboardByTeamId method will retrieve all KPI's of particular team
   * @param {teamId} teamId Takes teamId as input
   * @return {DashBoardResponse} . Dashboard with all KPI's
   */
  async getDashboardByTeamId(teamId: string): Promise<DashBoardResponse> {
    this.dash.teamId = teamId;

    const team = await this.teamRepository.findOne(teamId);

    const codeQuality: CodeQualityResponse | undefined = await this.codequalityService.getCodeQualitySnapshot(teamId);
    this.dash.codeQuality = codeQuality;

    const clientStatus: ClientStatusResponse | undefined = await this.clientStatusService.getClientFeedback(teamId);
    this.dash.clientStatus = clientStatus;

    const teamSpirit: TeamSpiritResponse | undefined = await this.teamSpiritService.getTeamSpiritFromSurvey(team!.name);
    this.dash.teamSpirit = teamSpirit;

    const burndown: BurndownResponse | undefined = await this.sprintService.getBurndown(teamId);
    this.dash.burndown = burndown;

    const sprintDetail: SprintDetailResponse | undefined = await this.sprintService.getSprintDetailResponse(teamId);
    this.dash.sprintDetail = sprintDetail;
    const velocityComparisonDTO:
      | VelocityComparisonResponse
      | undefined = await this.sprintService.getVelocityComparison(teamId);
    this.dash.velocity = velocityComparisonDTO;
    this.dash.teamStatus = this.fetchStatus(this.dash);
    return this.dash;
  }

  /**
   * getTeamsyBUId method will fetch the list of all teams belong to particular BU
   * @param {Bu_id} Bu_id it takes Business Unit as input
   * @return {TeamResponse[]} list of teams with their status
   */
  async getTeamsByCenterId(CenterId: string): Promise<TeamsInADC[]> {
    const teams: Team[] = await this.teamRepository.find({ where: { ad_center: CenterId } });
    console.log(teams);
    let teamsResponse: TeamsInADC = {} as TeamsInADC;
    let teamsDTOArray = [],
      i;
    for (i = 0; i < teams.length; i++) {
      teamsResponse.teamId = teams[i].id;
      teamsResponse.teamName = teams[i].name;
      this.dash = (await this.getDashboardByTeamId(teams[i].id)) as DashBoardResponse;
      teamsResponse.teamStatus = this.fetchStatus(this.dash);
      teamsDTOArray.push(teamsResponse);
      teamsResponse = {} as TeamsInADC;
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
    if (dashboard?.clientStatus == null) {
      return undefined;
    } else {
      let statusResult;
      const codeQualityStatus = dashboard!.codeQuality!.status;
      //const teamSpiritStatus = dashboard!.teamSpirit!.teamSpiritRating;
      const clientStatus = dashboard!.clientStatus!.clientSatisfactionRating;
      const burndownStatus = dashboard!.burndown!.burndownStatus;
      if (
        clientStatus >= 6 &&
        //teamSpiritStatus >= 6 &&
        codeQualityStatus == 'PASSED' &&
        burndownStatus == 'Ahead Time'
      ) {
        statusResult = 2;
      } else if (
        clientStatus < 6 &&
        //teamSpiritStatus < 6 &&
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

  async getOtherComponentsDetailByTeamId(
    teamId: string,
    privilegeList: string[],
    powerboardResponse: PowerboardResponse,
  ): Promise<PowerboardResponse> {
    if (privilegeList.includes('view_meeting_links')) {
      const dailyMeeting: DailyMeetingResponse[] = await this.dailyMeetingService.getDailyLinks(teamId);
      powerboardResponse.meetingLinks = dailyMeeting;
    } else {
      powerboardResponse.meetingLinks = [];
    }
    if (privilegeList.includes('view_team_links')) {
      const teamLink: TeamLinkResponse[] = await this.teamLinkService.getTeamLinks(teamId);
      powerboardResponse.teamLinks = teamLink;
    } else {
      powerboardResponse.teamLinks = [];
    }
    const images: ImageResponse[] = await this.imageService.getImagesForTeam(teamId);
    powerboardResponse.images = images;

    const videos: VideoResponse[] = await this.videoService.getVideosForTeam(teamId);
    powerboardResponse.videos = videos;

    return powerboardResponse;
  }

  /**
   * addTeam method will add team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async addTeam(addteam: AddTeam): Promise<Team> {
    const teamCode = addteam.teamCode;
    const result = await this.teamRepository.findOne({ where: { teamCode: teamCode } });
    if (result != null) {
      throw new BadRequestException('team already registered');
    } else {
      let teamSpiritUserDTO = {} as TeamSpiritUserDTO;
      teamSpiritUserDTO.Email = 'adminTeamSpirit@capgemini.com';
      teamSpiritUserDTO.Password = 'TeamSpiritAdmin!';
      const token = await this.teamSpiritService.loginToTeamSpirit(teamSpiritUserDTO);
      if (token) {
        let teamDTO = new TeamDTO();
        teamDTO.Frequency = addteam.frequency;
        teamDTO.Name = addteam.teamName;
        teamDTO.Num_mumbers = addteam.member_number;
        teamDTO.StartDate = addteam.start_date;

        const output = await this.teamSpiritService.addTeamToTeamSpirit(teamDTO);
        if (!output) {
          throw new BadRequestException('Team Not saved in Team Spirit App');
        } else {
          let team = new Team();
          team.name = addteam.teamName;
          team.teamCode = addteam.teamCode;
          team.projectKey = addteam.projectKey;
          team.ad_center = addteam.ad_center;
          return await this.teamRepository.save(team);
        }
      } else {
        throw new NotFoundException('Team Not Found in Team Spirit App');
      }
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
      viewTeamsResponse.teamCode = teamList[i].teamCode;
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
  async updateTeam(updateTeam: UpdateTeam): Promise<Team> {
    const teamId = updateTeam.teamId;
    const result = (await this.teamRepository.findOne({ where: { id: teamId } })) as Team;
    let team = new Team();
    if (!result) {
      throw new NotFoundException('Team Not Found');
    }
    team.id = result.id;
    team.teamCode = updateTeam.teamCode;
    team.projectKey = updateTeam.projectKey;
    team.ad_center = updateTeam.ad_center;
    try {
      return await this.teamRepository.save(team);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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

  async myCenter(teamId: string): Promise<MyCenter> {
    const result = await this.teamRepository.findOne({ where: { id: teamId } });
    let myCenter: MyCenter = {} as MyCenter;
    myCenter.centerId = result?.ad_center.id!;
    myCenter.centerName = result?.ad_center.name!;
    return myCenter;
  }

  async findTeamById(teamId: string): Promise<Team> {
    return (await this.teamRepository.findOne(teamId)) as Team;
  }

  async updateLogo(path: string, teamId: string): Promise<Team> {
    const team = await this.findTeamById(teamId);
    if (!team) {
      throw new NotFoundException('Team Not Found');
    }
    let teamOBJ = new Team();
    teamOBJ.id = team.id;
    teamOBJ.logo = path;
    return this.teamRepository.save(teamOBJ);
  }
}
