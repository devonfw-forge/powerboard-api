import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  BusinessUnitRepositoryMock,
  ClientStatusRepositoryMock,
  CodeQualityRepositoryMock,
  DailyMeetingLinkMock,
  ImagesMock,
  SprintRepositoryMock,
  TeamLinksMock,
  TeamRepositoryMock,
  TeamSpiritRepositoryMock,
  UserRepositoryMock,
  VideosMock,
  VisibilityMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';

import { BusinessUnit } from '../../business-units/model/entities/business-unit.entity';

import { ClientStatus } from '../../client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../client-status/services/client-status.crud.service';
import { CodeQualitySnapshot } from '../../code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { User } from '../../../core/user/model/entities/user.entity';
import { UserService } from '../../../core/user/services/user.service';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../sprint/services/sprint.crud.service';
import { TeamSpirit } from '../../team-spirit/model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../../team-spirit/services/team-spirit.crud.service';
import { Team } from '../../teams/model/entities/team.entity';
import { TeamCrudService } from './team.crud.service';

import { VisibilityCrudService } from '../../../visibility/services/visibility.crud.service';
import { VideosCrudService } from '../../../multimedia/videos/services/videos.crud.service';
import { ImagesCrudService } from '../../../multimedia/images/services/images.crud.service';
import { TeamLinksCrudService } from '../../../team-links/services/team-links.crud.service';
import { DailyMeetingCrudService } from '../../../daily-links/services/daily-meeting.crud.service';
import { DailyMeeting } from '../../../daily-links/model/entities/daily-meeting.entity';
import { TeamLinks } from '../../../team-links/model/entities/team-links.entity';
import { Images } from '../../../multimedia/images/model/entities/image.entity';
import { Videos } from '../../../multimedia/videos/model/entities/videos.entity';
import { Visibility } from '../../../visibility/model/entities/visibility.entity';
import { UserInfo } from '../../../core/userinfo/model/entities/userinfo.entity';
// import { ClientStatusResponse } from '../../client-status/model/dto/ClientStatusResponse';
// import { CodeQualityResponse } from '../../code-quality-snapshot/model/dto/CodeQualityResponse';
// import { SprintDetailResponse } from '../../sprint/model/dto/SprintDetailResponse';
// import { VelocityComparisonResponse } from '../../sprint/model/dto/VelocityComparisonResponse';
// import { TeamSpiritResponse } from '../../team-spirit/model/dto/TeamSpiritResponse';
// import { DashBoardResponse } from '../model/dto/DashBoardResponse';
// import { LoginResponse } from '../model/dto/LoginResponse';

describe('TeamCrudService', () => {
  let teamService: TeamCrudService;
  let clientStatusService: ClientStatusCrudService;
  let codeQualityService: CodeQualitySnapshotCrudService;
  let sprintService: SprintCrudService;
  let teamSpiritService: TeamSpiritCrudService;
  let dailyMeetingLinkService: DailyMeetingCrudService;
  let teamLinkService: TeamLinksCrudService;
  let imageService: ImagesCrudService;
  let videoService: VideosCrudService;
  let visibilityService: VisibilityCrudService;
  let userRepo: UserRepositoryMock;
  let teamRepo: TeamRepositoryMock;
  let businessUnitRepo: BusinessUnitRepositoryMock;
  let codeQualityRepo: CodeQualityRepositoryMock;
  let clientStatusRepo: ClientStatusRepositoryMock;
  let teamSpiritRepo: TeamSpiritRepositoryMock;
  let sprintRepo: SprintRepositoryMock;
  let dailyMeetingLinkRepo: DailyMeetingLinkMock;
  let teamLinksRepo: TeamLinksMock;
  let imageRepo: ImagesMock;
  let videoRepo: VideosMock;
  let visibilityRepo: VisibilityMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamCrudService,
        ClientStatusCrudService,
        CodeQualitySnapshotCrudService,
        TeamSpiritCrudService,
        SprintCrudService,
        UserService,
        DailyMeetingCrudService,
        TeamLinksCrudService,
        ImagesCrudService,
        VideosCrudService,
        VisibilityCrudService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
        {
          provide: getRepositoryToken(Team),
          useClass: TeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(BusinessUnit),
          useClass: BusinessUnitRepositoryMock,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
        {
          provide: getRepositoryToken(ClientStatus),
          useClass: ClientStatusRepositoryMock,
        },
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamSpirit),
          useClass: TeamSpiritRepositoryMock,
        },
        {
          provide: getRepositoryToken(DailyMeeting),
          useClass: DailyMeetingLinkMock,
        },
        {
          provide: getRepositoryToken(TeamLinks),
          useClass: TeamLinksMock,
        },
        {
          provide: getRepositoryToken(Images),
          useClass: ImagesMock,
        },
        {
          provide: getRepositoryToken(Videos),
          useClass: VideosMock,
        },
        {
          provide: getRepositoryToken(Visibility),
          useClass: VisibilityMock,
        },
      ],
    }).compile();

    teamService = module.get<TeamCrudService>(TeamCrudService);
    clientStatusService = module.get<ClientStatusCrudService>(ClientStatusCrudService);
    sprintService = module.get<SprintCrudService>(SprintCrudService);
    teamSpiritService = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
    codeQualityService = module.get<CodeQualitySnapshotCrudService>(CodeQualitySnapshotCrudService);
    dailyMeetingLinkService = module.get<DailyMeetingCrudService>(DailyMeetingCrudService);
    teamLinkService = module.get<TeamLinksCrudService>(TeamLinksCrudService);
    imageService = module.get<ImagesCrudService>(ImagesCrudService);
    videoService = module.get<VideosCrudService>(VideosCrudService);
    visibilityService = module.get<VisibilityCrudService>(VisibilityCrudService);
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
    teamRepo = module.get<TeamRepositoryMock>(getRepositoryToken(Team));
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    businessUnitRepo = module.get<BusinessUnitRepositoryMock>(getRepositoryToken(BusinessUnit));
    codeQualityRepo = module.get<CodeQualityRepositoryMock>(getRepositoryToken(CodeQualitySnapshot));
    clientStatusRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    teamSpiritRepo = module.get<TeamRepositoryMock>(getRepositoryToken(TeamSpirit));
    dailyMeetingLinkRepo = module.get<DailyMeetingLinkMock>(getRepositoryToken(DailyMeeting));
    teamLinksRepo = module.get<TeamLinksMock>(getRepositoryToken(TeamLinks));
    imageRepo = module.get<ImagesMock>(getRepositoryToken(Images));
    videoRepo = module.get<VideosMock>(getRepositoryToken(Videos));
    visibilityRepo = module.get<VisibilityMock>(getRepositoryToken(Visibility));
  });

  it('should be defined after module initialization', () => {
    expect(teamService).toBeDefined();
    expect(clientStatusService).toBeDefined();
    expect(codeQualityService).toBeDefined();
    expect(sprintService).toBeDefined();
    expect(teamSpiritService).toBeDefined();
    expect(dailyMeetingLinkService).toBeDefined();
    expect(teamLinkService).toBeDefined();
    expect(imageService).toBeDefined();
    expect(videoService).toBeDefined();
    expect(visibilityService).toBeDefined();
    expect(sprintRepo).toBeDefined();
    expect(teamRepo).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(businessUnitRepo).toBeDefined();
    expect(codeQualityRepo).toBeDefined();
    expect(clientStatusRepo).toBeDefined();
    expect(teamSpiritRepo).toBeDefined();
    expect(dailyMeetingLinkRepo).toBeDefined();
    expect(teamLinksRepo).toBeDefined();
    expect(imageRepo).toBeDefined();
    expect(videoRepo).toBeDefined();
    expect(visibilityRepo).toBeDefined();
  });

  // it('getDashBoardByUserId() method should return login response and getDashBoardByTeamId() should return dashboard response', async () => {

  //   const team: Team = {
  //     id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
  //     version: 1,
  //     createdAt: '2021-03-12T17:36:31.141Z',
  //     updatedAt: '2021-03-12T17:36:31.141Z',
  //     name: 'Diamler Devops',
  //     logo: 'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png',
  //     business_unit: {
  //       id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-12T17:36:31.141Z',
  //       updatedAt: '2021-03-12T17:36:31.141Z',
  //       name: 'ADC Bangalore',
  //       parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //   };
  //   const userInfo: UserInfo = {
  //     id: '',
  //     version: 1,
  //     createdAt: '2021-03-12T17:36:31.141Z',
  //     updatedAt: '2021-03-12T17:36:31.141Z',
  //     firstName: 'Azhar',
  //     lastName: 'Hussain',
  //     center: 'ADCenter Bangalore',
  //     email: 'azharhussain123@gmail.com',
  //     teameSpiritName: '',
  //   };

  //   const user: User = {
  //     id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
  //     version: 1,
  //     createdAt: '2021-03-12T17:36:31.141Z',
  //     updatedAt: '2021-03-12T17:36:31.141Z',
  //     username: 'John11',
  //     password: 'password',
  //     role: 0,
  //     user: userInfo,
  //     teamId: team,
  //   };

  //   const sprint: Sprint = {
  //     id: '20255bf8-ada5-495c-8019-8d7ab76d488e',
  //     version: 1,
  //     createdAt: '2021-03-22T08:39:31.870Z',
  //     updatedAt: '2021-03-22T08:39:31.870Z',
  //     sprint_number: 10,
  //     start_date: '2021-02-10',
  //     end_date: '2021-02-25',
  //     status: '11155bf3-ada5-495c-8019-8d7ab76d488e',
  //     team: team,
  //     work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
  //   };

  //   const clientStatus: ClientStatus = {
  //     id: '20112bf8-ada5-495c-8019-8d7ab76d488e',
  //     version: 1,
  //     createdAt: '2021-03-27T16:07:27.741Z',
  //     updatedAt: '2021-03-27T16:07:27.741Z',
  //     client_rating: 5,
  //     sprint: sprint,
  //   };
  //   const teamSpirit: TeamSpirit = {
  //     id: '20111bf8-ada5-495c-8019-8d7ab76d488e',
  //     version: 1,
  //     createdAt: '2021-03-22T08:39:31.870Z',
  //     updatedAt: '2021-03-22T08:39:31.870Z',
  //     team_spirit_rating: 8,
  //     sprint: sprint,
  //   };
  //   const businessUnits: BusinessUnit[] = [
  //     {
  //       id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'Capgemini India',
  //       parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46055bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'NA BU',
  //       parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46155bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'Sogeti',
  //       parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46255bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'NA AS CSD',
  //       parent_id: '46055bf7-ada7-495c-8019-8d7ab62d488e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46355bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'Europe CSD AS',
  //       parent_id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'Europe BU',
  //       parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46355bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'Europe CSD AD',
  //       parent_id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //     {
  //       id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
  //       version: 1,
  //       createdAt: '2021-03-27T16:07:27.741Z',
  //       updatedAt: '2021-03-27T16:07:27.741Z',
  //       name: 'ADC Bangalore',
  //       parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
  //       root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
  //     },
  //   ];

  //   const breadCrumbResponse: any = [
  //     {
  //       bu_id: 1,
  //       bu_name: 'Capgemini India',
  //     },
  //     {
  //       bu_id: 2,
  //       bu_name: 'Europe BU',
  //     },
  //     {
  //       bu_id: 3,
  //       bu_name: 'Europe CSD AD',
  //     },
  //     {
  //       bu_id: 4,
  //       bu_name: 'ADC Bangalore',
  //     },
  //     {
  //       bu_name: 'Diamler Devops',
  //     },
  //   ];

  //   const codeQuality: CodeQualitySnapshot = {
  //     id: '61155bf8-ada5-495c-8019-8d7ab76d488e',
  //     version: 1,
  //     createdAt: '2021-03-22T08:39:31.870Z',
  //     updatedAt: '2021-03-22T08:39:31.870Z',
  //     bugs: 3,
  //     debt: 4,
  //     code_coverage: 90,
  //     status: 'PASSED',
  //     snapshot_time: '2021-02-25T09:00:22.000Z',
  //     team: team,
  //   };

  //   const codeQualityResponse: CodeQualityResponse = {
  //     bugs: 3,
  //     debt: 4,
  //     codeCoverage: 90,
  //     status: 'PASSED',
  //   };

  //   const clientStatusResponse: ClientStatusResponse = {
  //     clientSatisfactionRating: 5,
  //     sprintNumber: 10,
  //   };

  //   const teamSpiritResponse: TeamSpiritResponse = {
  //     teamSpiritRating: 8,
  //     sprintNumber: 10,
  //   };

  //   const burndownResponse: any = {
  //     workUnit: 'story point',
  //     remainingDays: 15,
  //     remainingWork: 128,
  //     count: 53,
  //     burndownStatus: 'Behind Time',
  //   };

  //   const sprintDetailResponse: SprintDetailResponse = {
  //     Sprint_current_day: 13,
  //     sprint_number: 11,
  //     Sprint_days: 28,
  //   };

  //   const velocityComparisonResponse: VelocityComparisonResponse = {
  //     Avg: 76,
  //     Committed: 140,
  //     Completed: 12,
  //   };

  //   const dashBoardResponse: DashBoardResponse = {
  //     teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
  //     teamStatus: 1,
  //     codeQualityResponse: codeQualityResponse,
  //     clientStatusResponse: clientStatusResponse,
  //     teamSpiritResponse: teamSpiritResponse,
  //     burndownResponse: burndownResponse,
  //     sprintDetailResponse: sprintDetailResponse,
  //     velocityResponse: velocityComparisonResponse,
  //   };

  //   const expectedLoginResponse: LoginResponse = {
  //     dashboard: dashBoardResponse,
  //     user_breadCrumb: breadCrumbResponse,
  //     dump_businessUnit: businessUnits,
  //   };

  //   console.log(expectedLoginResponse)
  //   const sprintForBurndown: any = [
  //     {
  //       sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
  //       sprint_version: 1,
  //       sprint_createdAt: '2021 - 04 - 28T05: 57: 33.080Z',
  //       sprint_updatedAt: '2021 - 04 - 28T05: 57: 33.080Z',
  //       sprint_sprint_number: 11,
  //       sprint_start_date: '2021 - 04 - 24T18: 30: 00.000Z',
  //       sprint_end_date: '2021 - 05 - 22T18: 30: 00.000Z',
  //       sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
  //       sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
  //       sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
  //       st_status: 'In Progress',
  //       ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
  //       ss_date_time: '2021 - 04 - 26T09: 00: 00.000Z',
  //       ssm_value: '140',
  //       sw_work_unit: 'story point',
  //       smt_name: 'Work Committed',
  //     },
  //     {
  //       sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
  //       sprint_version: 1,
  //       sprint_createdAt: '2021 - 04 - 28T05: 57: 33.080Z',
  //       sprint_updatedAt: '2021 - 04 - 28T05: 57: 33.080Z',
  //       sprint_sprint_number: 11,
  //       sprint_start_date: '2021 - 04 - 24T18: 30: 00.000Z',
  //       sprint_end_date: '2021 - 05 - 22T18: 30: 00.000Z',
  //       sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
  //       sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
  //       sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
  //       st_status: 'In Progress',
  //       ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
  //       ss_date_time: '2021 - 04 - 26T09: 00: 00.000Z',
  //       ssm_value: '12',
  //       sw_work_unit: 'story point',
  //       smt_name: 'Work Completed',
  //     },
  //   ];

  //   const createQueryBuilder1: any = {
  //     where: () => createQueryBuilder1,
  //     getMany: jest.fn().mockResolvedValue(businessUnits),
  //   };

  //   const createQueryBuilder2: any = {
  //     limit: () => createQueryBuilder2,
  //     groupBy: () => createQueryBuilder2,
  //     where: () => createQueryBuilder2,
  //     orderBy: () => createQueryBuilder2,
  //     getOne: jest.fn().mockResolvedValue(codeQuality),
  //   };

  //   const createQueryBuilder3: any = {
  //     limit: () => createQueryBuilder3,
  //     where: () => createQueryBuilder3,
  //     getOne: jest.fn().mockResolvedValue(clientStatus),
  //   };

  //   const createQueryBuilder4: any = {
  //     limit: () => createQueryBuilder4,
  //     groupBy: () => createQueryBuilder4,
  //     where: () => createQueryBuilder4,
  //     orderBy: () => createQueryBuilder4,
  //     skip: () => createQueryBuilder4,
  //     take: () => createQueryBuilder4,
  //     addSelect: () => createQueryBuilder4,
  //     innerJoin: () => createQueryBuilder4,
  //     leftJoin: () => createQueryBuilder4,
  //     andWhere: () => createQueryBuilder4,
  //     getOne: jest.fn().mockResolvedValue(sprint),
  //     getRawMany: jest.fn().mockResolvedValue(sprintForBurndown),
  //   };

  //   const createQueryBuilder5: any = {
  //     limit: () => createQueryBuilder5,
  //     where: () => createQueryBuilder5,
  //     getOne: jest.fn().mockResolvedValue(teamSpirit),
  //   };

  //   jest.spyOn(codeQualityRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
  //   jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
  //   jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
  //   jest.spyOn(businessUnitRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
  //   jest.spyOn(clientStatusRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder3);
  //   jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder4);
  //   jest.spyOn(teamSpiritRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder5);

  //   const actualLoginResponse = await teamService.getDashboardByUserId(user.id);
  //   await teamService.getDashboardByUserId(user.id);
  //   const actualDashBoardResponse = await teamService.getDashboardByTeamId(team.id);
  //   expect(actualDashBoardResponse).toEqual(dashBoardResponse);
  //   expect(userRepo.findOne).toHaveBeenCalledTimes(1);
  //   expect(teamRepo.findOne).toHaveBeenCalledTimes(1);
  //   expect(actualLoginResponse).toEqual(expectedLoginResponse);
  // });

  it('getElectronBoardByUserId() method should return electron app response for the particular userId response', async () => {
    const team: Team = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Diamler Devops',
      logo: 'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png',
      business_unit: {
        id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-12T17:36:31.141Z',
        updatedAt: '2021-03-12T17:36:31.141Z',
        name: 'ADC Bangalore',
        parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
    };
    const userInfo: UserInfo = {
      id: '',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      firstName: 'Azhar',
      lastName: 'Hussain',
      center: 'ADCenter Bangalore',
      email: 'azharhussain123@gmail.com',
      teameSpiritName: '',
    };

    const user: User = {
      id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      username: 'raj11',
      password: 'password',
      role: 0,
      user: userInfo,
      teamId: team,
    };
    const images: Images[] = [
      {
        id: '52055bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        image: 'uploads\\profileimages\\jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
      {
        id: '52155bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        image: 'uploads\\profileimages\\power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
      {
        id: 'd123011a-7fd0-4237-b1b5-d3fc657d2467',
        version: 1,
        createdAt: '2021-04-29T10:27:12.907Z',
        updatedAt: '2021-04-29T10:27:12.907Z',
        image: 'uploads\\profileimages\\powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
    ];

    const videos: Videos[] = [
      {
        id: '52255bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        content: 'uploads\\videos\\coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
      {
        id: '52355bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        content: 'uploads\\videos\\aspirants95cf1dfd-43e9-4cc4-8257-a6ba5c70e3bd.mp4',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
    ];

    const teamLinks = [
      {
        id: '51055bf7-ada6-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        title: 'Jira Cloud',
        link: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
      },
      {
        id: '51055bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        title: 'GitHub',
        link: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
      },
    ];

    const dailyMeetingLinks = [
      {
        id: '43000bf7-ada7-495c-8019-8d7ab76d490e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        type: 'TEAMS',
        dailyMeetingLink:
          'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
      },
      {
        id: '8ea451ab-ba1a-4e6c-a978-f65bd2b38d90',
        version: 1,
        createdAt: '2021-04-29T09:33:13.309Z',
        updatedAt: '2021-04-29T09:33:13.309Z',
        type: 'TEAMS',
        dailyMeetingLink: 'https://microsoft.com',
      },
      {
        id: '74f1e7b8-6db4-4dd5-9fb9-627351a6f93c',
        version: 1,
        createdAt: '2021-05-03T05:44:27.025Z',
        updatedAt: '2021-05-03T05:44:27.025Z',
        type: 'TEAMS',
        dailyMeetingLink: 'https://microsoft.com',
      },
      {
        id: '58d23554-6f19-4f18-b369-99c8bbcdcf7b',
        version: 1,
        createdAt: '2021-05-03T05:46:35.907Z',
        updatedAt: '2021-05-03T05:46:35.907Z',
        type: 'TEAMS',
        dailyMeetingLink: 'https://microsoft.com',
      },
    ];

    const visibility: Visibility = {
      id: '52455bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
      dailyMeeting: true,
      teamLink: true,
      images: true,
      videos: true,
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };

    const expectedElectronBoardLoginResponse = {
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      center: 'ADCenter Bangalore',
      teamLogo: 'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png',
      dailyMeetingResponse: dailyMeetingLinks,
      teamLinkResponse: teamLinks,
      imageResponse: images,
      videoResponse: videos,
      visibleResponse: visibility,
    };

    console.log(expectedElectronBoardLoginResponse);
    const createQueryBuilder1: any = {
      where: () => createQueryBuilder1,
      getMany: jest.fn().mockResolvedValue(dailyMeetingLinks),
    };
    const createQueryBuilder2: any = {
      where: () => createQueryBuilder2,
      getMany: jest.fn().mockResolvedValue(teamLinks),
    };

    jest.spyOn(dailyMeetingLinkRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
    jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
    jest.spyOn(teamLinksRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
    jest.spyOn(imageRepo, 'find').mockImplementation(() => images);
    jest.spyOn(videoRepo, 'find').mockImplementation(() => videos);
    jest.spyOn(visibilityRepo, 'findOne').mockImplementation(() => visibility);

    // const actualLoginResponseForElectronApp = await teamService.getElectronBoardByUserId(user.id);
    await teamService.getElectronBoardByUserId(user.id);
    expect(userRepo.findOne).toHaveBeenCalledTimes(1);
    // expect(actualLoginResponseForElectronApp).toEqual(expectedElectronBoardLoginResponse);
  });
});
//     const team: Team = {
//         id: 1,
//         version: 1,
//         createdAt: '2021-03-12T17:36:31.141Z',
//         updatedAt: '2021-03-12T17:36:31.141Z',
//         name: 'Diamler Devops',
//         business_unit: {
//             id: 4,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'ADC Bangalore',
//             parent_id: 3,
//             root_parent_id: 1,
//         },
//     }

//     const user: User = {
//         id: 10,
//         version: 1,
//         createdAt: '2021-03-12T17:36:31.141Z',
//         updatedAt: '2021-03-12T17:36:31.141Z',
//         username: 'John11',
//         password: 'password',
//         role: 0,
//         name: 'John',
//         teamId: team
//     }

//     const businessUnits: BusinessUnit[] = [
//         {
//             id: 4,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'ADC Bangalore',
//             parent_id: 3,
//             root_parent_id: 1,
//         },
//         {
//             id: 3,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'Europe CSD AD',
//             parent_id: 2,
//             root_parent_id: 1,
//         },
//         {
//             id: 2,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'Europe BU',
//             parent_id: 1,
//             root_parent_id: 1,
//         },
//         {
//             id: 1,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'Capgemini India',
//             parent_id: 1,
//             root_parent_id: 1,
//         },
//     ]

//     const codeQualityResponse: CodeQualityResponse = {
//         bugs: 3,
//         debt: 4,
//         codeCoverage: 90,
//         status: "PASSED"
//     }

//     const clientStatusResponse: ClientStatusResponse = {
//         clientSatisfactionRating: 5,
//         sprintNumber: 10,
//         teamName: 'Diamler Devops'
//     }

//     const teamSpiritResponse: TeamSpiritResponse = {
//         teamSpiritRating: 8,
//         sprintNumber: 10
//     }

//     const burndownResponse: BurndownResponse = {
//         workUnit: 2,
//         remainingDays: 23,
//         remainingWork: 128,
//         count: 13,
//         burndownStatus: "Behind Time"
//     }

//     const sprintDetailResponse: SprintDetailResponse = {
//         Sprint_current_day: 5,
//         sprint_number: 11,
//         Sprint_days: 28
//     }

//     const velocityComparisonResponse: VelocityComparisonResponse = {
//         Avg: 115,
//         Committed: 140,
//         Completed: 12
//     }

//     const dashBoardResponse: DashBoardResponse = {
//         teamId: 1,
//         teamStatus: 1,
//         codeQualityResponse: codeQualityResponse,
//         clientStatusResponse: clientStatusResponse,
//         teamSpiritResponse: teamSpiritResponse,
//         burndownResponse: burndownResponse,
//         sprintDetailResponse: sprintDetailResponse,
//         velocityResponse: velocityComparisonResponse
//     }

// const codeQuality: CodeQualitySnapshot = {
//     id: 12,
//     version: 1,
//     createdAt: '2021-03-22T08:39:31.870Z',
//     updatedAt: '2021-03-22T08:39:31.870Z',
//     bugs: 3,
//     debt: 4,
//     code_coverage: 90,
//     status: 'PASSED',
//     snapshot_time: '2021-02-25T09:00:22.000Z',
//     team: {
//         id: 1,
//         version: 1,
//         createdAt: '2021-03-22T08:39:31.870Z',
//         updatedAt: '2021-03-22T08:39:31.870Z',
//         name: 'Diamler Devops',
//         business_unit: {
//             id: 4,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'ADC Bangalore',
//             parent_id: 3,
//             root_parent_id: 1,
//         },
//     },
// };

// const createQueryBuilder1: any = {
//     where: () => createQueryBuilder1,
//     getMany: jest.fn().mockResolvedValue(businessUnits),
// };

// const createQueryBuilder2: any = {
//     limit: () => createQueryBuilder2,
//     groupBy: () => createQueryBuilder2,
//     where: () => createQueryBuilder2,
//     orderBy: () => createQueryBuilder2,
//     getOne: jest.fn().mockResolvedValue(codeQuality),
// };

//     jest.spyOn(userRepo, 'findOne').mockResolvedValue(() => user);
//     jest.spyOn(teamRepo, 'findOne').mockResolvedValue(() => team);
//     jest.spyOn(businessUnitRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1)

//     const actualDashBoardResponse = await teamService.getDashboardByTeamId(team.id);
//     expect(actualDashBoardResponse).toEqual(dashBoardResponse);
//     expect(teamRepo.findOne).toHaveBeenCalledTimes(1);

// });
