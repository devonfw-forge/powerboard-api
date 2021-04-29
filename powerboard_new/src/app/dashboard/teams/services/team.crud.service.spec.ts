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
import { ClientStatusResponse } from '../../client-status/model/dto/ClientStatusResponse';
//import { ClientStatusResponse } from '../../client-status/model/dto/ClientStatusResponse';
import { ClientStatus } from '../../client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../client-status/services/client-status.crud.service';
import { CodeQualityResponse } from '../../code-quality-snapshot/model/dto/CodeQualityResponse';
import { CodeQualitySnapshot } from '../../code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { User } from '../../../core/user/model/entities/user.entity';
import { UserService } from '../../../core/user/services/user.service';
//import { BurndownResponse } from '../../sprint/model/dto/BurndownResponse';
import { SprintDetailResponse } from '../../sprint/model/dto/SprintDetailResponse';
import { VelocityComparisonResponse } from '../../sprint/model/dto/VelocityComparisonResponse';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../sprint/services/sprint.crud.service';
import { TeamSpiritResponse } from '../../team-spirit/model/dto/TeamSpiritResponse';
import { TeamSpirit } from '../../team-spirit/model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../../team-spirit/services/team-spirit.crud.service';
import { Team } from '../../teams/model/entities/team.entity';
//import { BreadCrumbResponse } from '../model/dto/BreadCrumbResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { LoginResponse } from '../model/dto/LoginResponse';
import { TeamCrudService } from './team.crud.service';
import { DailyMeetingCrudService } from '../../../daily-links/services/daily-meeting.crud.service';
import { TeamLinksCrudService } from '../../../team-links/services/team-links.crud.service';
import { ImagesCrudService } from '../../../multimedia/images/services/images.crud.service';
import { VideosCrudService } from '../../../multimedia/videos/services/videos.crud.service';
import { VisibilityCrudService } from '../../../visibility/services/visibility.crud.service';
import { DailyMeeting } from '../../../daily-links/model/entities/daily-meeting.entity';
import { TeamLinks } from '../../../team-links/model/entities/team-links.entity';
import { Images } from '../../../multimedia/images/model/entities/image.entity';
import { Videos } from '../../../multimedia/videos/model/entities/videos.entity';
import { Visibility } from '../../../visibility/model/entities/visibility.entity';

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
    teamRepo = module.get<TeamRepositoryMock>(getRepositoryToken(Team));
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    businessUnitRepo = module.get<BusinessUnitRepositoryMock>(getRepositoryToken(BusinessUnit));
    codeQualityRepo = module.get<CodeQualityRepositoryMock>(getRepositoryToken(CodeQualitySnapshot));
    clientStatusRepo = module.get<ClientStatusRepositoryMock>(getRepositoryToken(ClientStatus));
    teamSpiritRepo = module.get<TeamRepositoryMock>(getRepositoryToken(TeamSpirit));
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
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

  it('getDashBoardByUserId() method should return login response and getDashBoardByTeamId() should return dashboard response', async () => {
    const team: Team = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Diamler Devops',
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

    const user: User = {
      id: '10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      username: 'John11',
      password: 'password',
      role: 0,
      name: 'John',
      teamId: team,
    };

    const sprint: Sprint = {
      id: '20255bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      sprint_number: 10,
      start_date: '2021-02-10',
      end_date: '2021-02-25',
      status: '11155bf3-ada5-495c-8019-8d7ab76d488e',
      team: team,
      work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
    };

    const clientStatus: ClientStatus = {
      id: '20112bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-27T16:07:27.741Z',
      updatedAt: '2021-03-27T16:07:27.741Z',
      client_rating: 5,
      sprint: sprint,
    };
    const teamSpirit: TeamSpirit = {
      id: '20111bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      team_spirit_rating: 8,
      sprint: sprint,
    };
    const businessUnits: BusinessUnit[] = [
      {
        id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'Capgemini India',
        parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46055bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'NA BU',
        parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46155bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'Sogeti',
        parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46255bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'NA AS CSD',
        parent_id: '46055bf7-ada7-495c-8019-8d7ab62d488e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46355bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'Europe CSD AS',
        parent_id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'Europe BU',
        parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46355bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'Europe CSD AD',
        parent_id: '46455bf7-ada7-495c-8019-8d7ab62d488e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
      {
        id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-03-27T16:07:27.741Z',
        updatedAt: '2021-03-27T16:07:27.741Z',
        name: 'ADC Bangalore',
        parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
        root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
      },
    ];

    const breadCrumbResponse: any = [
      {
        bu_id: 1,
        bu_name: 'Capgemini India',
      },
      {
        bu_id: 2,
        bu_name: 'Europe BU',
      },
      {
        bu_id: 3,
        bu_name: 'Europe CSD AD',
      },
      {
        bu_id: 4,
        bu_name: 'ADC Bangalore',
      },
      {
        bu_name: 'Diamler Devops',
      },
    ];

    const codeQuality: CodeQualitySnapshot = {
      id: '61155bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      bugs: 3,
      debt: 4,
      code_coverage: 90,
      status: 'PASSED',
      snapshot_time: '2021-02-25T09:00:22.000Z',
      team: {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-03-22T08:39:31.870Z',
        updatedAt: '2021-03-22T08:39:31.870Z',
        name: 'Diamler Devops',
        business_unit: {
          id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-03-12T17:36:31.141Z',
          updatedAt: '2021-03-12T17:36:31.141Z',
          name: 'ADC Bangalore',
          parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
          root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
        },
      },
    };

    const codeQualityResponse: CodeQualityResponse = {
      bugs: 3,
      debt: 4,
      codeCoverage: 90,
      status: 'PASSED',
    };

    const clientStatusResponse: ClientStatusResponse = {
      clientSatisfactionRating: 5,
      sprintNumber: 10,
    };

    const teamSpiritResponse: TeamSpiritResponse = {
      teamSpiritRating: 8,
      sprintNumber: 10,
    };

    const burndownResponse: any = {
      workUnit: 'story point',
      remainingDays: 12,
      remainingWork: 128,
      count: 68,
      burndownStatus: 'Behind Time',
    };

    const sprintDetailResponse: SprintDetailResponse = {
      Sprint_current_day: 16,
      sprint_number: 11,
      Sprint_days: 28,
    };

    const velocityComparisonResponse: VelocityComparisonResponse = {
      Avg: 76,
      Committed: 140,
      Completed: 12,
    };

    const dashBoardResponse: DashBoardResponse = {
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      teamStatus: 1,
      codeQualityResponse: codeQualityResponse,
      clientStatusResponse: clientStatusResponse,
      teamSpiritResponse: teamSpiritResponse,
      burndownResponse: burndownResponse,
      sprintDetailResponse: sprintDetailResponse,
      velocityResponse: velocityComparisonResponse,
    };

    const expectedLoginResponse: LoginResponse = {
      dashboard: dashBoardResponse,
      user_breadCrumb: breadCrumbResponse,
      dump_businessUnit: businessUnits,
    };

    const sprintForBurndown: any = [
      {
        sprint_id: 3,
        sprint_version: 1,
        sprint_createdAt: '2021-03-27T16:07:27.741Z',
        sprint_updatedAt: '2021-03-27T16:07:27.741Z',
        sprint_sprint_number: 11,
        sprint_start_date: '2021-03-25',
        sprint_end_date: '2021-04-22',
        sprint_status: 2,
        sprint_team_id: 1,
        sprint_work_unit: 2,
        st_status: 'In Progress',
        ss_id: 1002,
        ss_date_time: '2021-03-26',
        ssm_value: '140',
        sw_work_unit: 'story point',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: 3,
        sprint_version: 1,
        sprint_createdAt: '2021-03-27T16:07:27.741Z',
        sprint_updatedAt: '2021-03-27T16:07:27.741Z',
        sprint_sprint_number: 11,
        sprint_start_date: '2021-03-25',
        sprint_end_date: '2021-04-22',
        sprint_status: 2,
        sprint_team_id: 1,
        sprint_work_unit: 2,
        st_status: 'In Progress',
        ss_id: 1002,
        ss_date_time: '2021-03-26',
        ssm_value: '12',
        sw_work_unit: 'story point',
        smt_name: 'Work Completed',
      },
    ];

    const createQueryBuilder1: any = {
      where: () => createQueryBuilder1,
      getMany: jest.fn().mockResolvedValue(businessUnits),
    };

    const createQueryBuilder2: any = {
      limit: () => createQueryBuilder2,
      groupBy: () => createQueryBuilder2,
      where: () => createQueryBuilder2,
      orderBy: () => createQueryBuilder2,
      getOne: jest.fn().mockResolvedValue(codeQuality),
    };

    const createQueryBuilder3: any = {
      limit: () => createQueryBuilder3,
      where: () => createQueryBuilder3,
      getOne: jest.fn().mockResolvedValue(clientStatus),
    };

    const createQueryBuilder4: any = {
      limit: () => createQueryBuilder4,
      groupBy: () => createQueryBuilder4,
      where: () => createQueryBuilder4,
      orderBy: () => createQueryBuilder4,
      skip: () => createQueryBuilder4,
      take: () => createQueryBuilder4,
      addSelect: () => createQueryBuilder4,
      innerJoin: () => createQueryBuilder4,
      leftJoin: () => createQueryBuilder4,
      andWhere: () => createQueryBuilder4,
      getOne: jest.fn().mockResolvedValue(sprint),
      getRawMany: jest.fn().mockResolvedValue(sprintForBurndown),
    };

    const createQueryBuilder5: any = {
      limit: () => createQueryBuilder5,
      where: () => createQueryBuilder5,
      getOne: jest.fn().mockResolvedValue(teamSpirit),
    };

    jest.spyOn(codeQualityRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
    jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
    jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
    jest.spyOn(businessUnitRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    jest.spyOn(clientStatusRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder3);
    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder4);
    jest.spyOn(teamSpiritRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder5);

    const actualLoginResponse = await teamService.getDashboardByUserId(user.id);
    const actualDashBoardResponse = await teamService.getDashboardByTeamId(team.id);
    expect(actualDashBoardResponse).toEqual(dashBoardResponse);
    expect(userRepo.findOne).toHaveBeenCalledTimes(1);
    expect(teamRepo.findOne).toHaveBeenCalledTimes(1);
    expect(actualLoginResponse).toEqual(expectedLoginResponse);
  });
});
// it('getDashBoardByTeamId() method should return dashboard response', async () => {

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
