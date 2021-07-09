import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ADCenterRepositoryMock,
  BusinessUnitRepositoryMock,
  ClientStatusRepositoryMock,
  CodeQualityRepositoryMock,
  DailyMeetingLinkMock,
  ImagesMock,
  SprintRepositoryMock,
  TeamLinksMock,
  TeamRepositoryMock,
  TeamSpiritRepositoryMock,
  UserInfoRepositoryMock,
  UserRepositoryMock,
  UserRoleRepositoryMock,
  UserTeamRepositoryMock,
  VideosMock,
  VisibilityMock,
} from '../../../../test/mockCrudRepository/crudRepository.mock';
import { User } from '../../core/user/model/entities/user.entity';
import { UserInfo } from '../../core/user/model/entities/user_info.entity';
import { UserRole } from '../../core/user/model/entities/user_role.entity';
import { UserTeam } from '../../core/user/model/entities/user_team.entity';
import { UserService } from '../../core/user/services/user.service';
import { DailyMeeting } from '../../daily-links/model/entities/daily-meeting.entity';
import { DailyMeetingCrudService } from '../../daily-links/services/daily-meeting.crud.service';
import { ADCenter } from '../../dashboard/ad-center/model/entities/ad-center.entity';
import { BusinessUnit } from '../../dashboard/business-units/model/entities/business-unit.entity';

import { ClientStatus } from '../../dashboard/client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../dashboard/client-status/services/client-status.crud.service';

import { CodeQualitySnapshot } from '../../dashboard/code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';

import { Sprint } from '../../dashboard/sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../dashboard/sprint/services/sprint.crud.service';

import { TeamSpiritMedian } from '../../dashboard/team-spirit-integration/model/entities/team-spirit-median.entity';
//import { TeamSpirit } from '../../dashboard/team-spirit-integration/model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { Images } from '../../multimedia/images/model/entities/image.entity';
import { ImagesCrudService } from '../../multimedia/images/services/images.crud.service';
import { Videos } from '../../multimedia/videos/model/entities/videos.entity';
import { VideosCrudService } from '../../multimedia/videos/services/videos.crud.service';

import { TeamLinks } from '../../team-links/model/entities/team-links.entity';
import { TeamLinksCrudService } from '../../team-links/services/team-links.crud.service';

import { Team } from '../../teams/model/entities/team.entity';
import { Visibility } from '../../visibility/model/entities/visibility.entity';
import { VisibilityCrudService } from '../../visibility/services/visibility.crud.service';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { UpdateTeam } from '../model/dto/updateTeam.interface';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { TeamCrudService } from './team.crud.service';

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
  let teamSpiritRepository: TeamSpiritRepositoryMock;
  let sprintRepo: SprintRepositoryMock;
  let dailyMeetingLinkRepo: DailyMeetingLinkMock;
  let teamLinksRepo: TeamLinksMock;
  let imageRepo: ImagesMock;
  let videoRepo: VideosMock;
  let visibilityRepo: VisibilityMock;
  let adcenterRepo: ADCenterRepositoryMock;
  let httpService: HttpService;
  let userRoleRepo: UserRoleRepositoryMock;
  let userInfoRepo: UserInfoRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
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
          provide: getRepositoryToken(UserRole),
          useClass: UserRoleRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserTeam),
          useClass: UserTeamRepositoryMock,
        },
        {
          provide: getRepositoryToken(UserInfo),
          useClass: UserInfoRepositoryMock,
        },
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
        {
          provide: getRepositoryToken(ADCenter),
          useClass: ADCenterRepositoryMock,
        },
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
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
    dailyMeetingLinkRepo = module.get<DailyMeetingLinkMock>(getRepositoryToken(DailyMeeting));
    teamLinksRepo = module.get<TeamLinksMock>(getRepositoryToken(TeamLinks));
    imageRepo = module.get<ImagesMock>(getRepositoryToken(Images));
    videoRepo = module.get<VideosMock>(getRepositoryToken(Videos));
    visibilityRepo = module.get<VisibilityMock>(getRepositoryToken(Visibility));
    adcenterRepo = module.get<ADCenterRepositoryMock>(getRepositoryToken(ADCenter));
    httpService = module.get<HttpService>(HttpService);
    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userInfoRepo = module.get<UserInfoRepositoryMock>(getRepositoryToken(UserInfo));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userService = module.get<UserService>(UserService);
  });

  it('should be defined after module initialization', () => {
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(userInfoRepo).toBeDefined();
    expect(teamService).toBeDefined();
    expect(clientStatusService).toBeDefined();
    expect(codeQualityService).toBeDefined();
    expect(sprintService).toBeDefined();
    expect(userService).toBeDefined();
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
    expect(teamSpiritRepository).toBeDefined();
    expect(dailyMeetingLinkRepo).toBeDefined();
    expect(teamLinksRepo).toBeDefined();
    expect(imageRepo).toBeDefined();
    expect(videoRepo).toBeDefined();
    expect(visibilityRepo).toBeDefined();
    expect(adcenterRepo).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('updateTeam() should update the team', () => {
    test('test 1 if team not found', async () => {
      //inputs
      const updateTeam: UpdateTeam = {
        teamId: 'fe4f8120-8a2c-47ad-bad7-86e412e341c1',
        teamCode: '99009188',
        projectKey: 'P11247',
      };

      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);

      try {
        await teamService.updateTeam(updateTeam);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
    test('test 2 if team found', async () => {
      //inputs
      const updateTeam: UpdateTeam = {
        teamId: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        teamCode: '92009188',
        projectKey: 'P31247',
      };

      const result = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 4,
        createdAt: '2021-06-25T06:25:06.419Z',
        updatedAt: '2021-07-07T11:16:47.830Z',
        name: 'Team E',
        teamCode: '93009188',
        projectKey: 'P41247',
        logo: '',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-06-25T06:25:06.419Z',
          updatedAt: '2021-06-25T06:25:06.419Z',
          name: 'ADCenter Murcia',
        },
      };

      const expectedOutput = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        teamCode: '92009188',
        projectKey: 'P31247',
        logo: '',
        version: 6,
        updatedAt: '2021-07-07T11:16:47.830Z',
      };

      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => result);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => expectedOutput);
      const actualOutput = await teamService.updateTeam(updateTeam);
      expect(teamRepo.findOne).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getDashboardByTeamId()', () => {
    test('test 1 if team not present', async () => {
      //inputs
      const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d481e';

      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);

      try {
        await teamService.getDashboardByTeamId(teamId);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });
    test('test 2 if team present', async () => {
      //inputs
      const teamId_para: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const codeQualityResponse: any = { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' };
      const clientStatusResponse: any = { clientSatisfactionRating: 5, sprintNumber: 10 };
      const teamSpiritResponse: any = { teamSpiritRating: 7 };
      const burndownResponse: any = {
        workUnit: 'story point',
        remainingDays: 26,
        remainingWork: 122,
        count: 8,
        burndownStatus: 'Ahead Time',
      };
      const status = 1;
      const velocityComparisonResponse: any = { Avg: 115, Committed: 140, Completed: 18 };
      const spirintDetailResponse: any = { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 };

      const team = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-07-07T12:22:21.770Z',
        updatedAt: '2021-07-07T12:22:21.770Z',
        name: 'Team A',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: '',
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-07-07T12:22:21.770Z',
          updatedAt: '2021-07-07T12:22:21.770Z',
          name: 'ADCenter Bangalore',
        },
      };

      const expectedOutput: DashBoardResponse = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: { clientSatisfactionRating: 5, sprintNumber: 10 },
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
        teamStatus: 1,
      };

      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(codeQualityService, 'getCodeQualitySnapshot').mockImplementation(() => codeQualityResponse);
      jest.spyOn(clientStatusService, 'getClientFeedback').mockImplementation(() => clientStatusResponse);
      jest.spyOn(teamSpiritService, 'getTeamSpiritFromSurvey').mockImplementation(() => teamSpiritResponse);
      jest.spyOn(sprintService, 'getBurndown').mockImplementation(() => burndownResponse);
      jest.spyOn(sprintService, 'getSprintDetailResponse').mockImplementation(() => spirintDetailResponse);
      jest.spyOn(sprintService, 'getVelocityComparison').mockImplementation(() => velocityComparisonResponse);
      jest.spyOn(teamService, 'fetchStatus').mockImplementation(() => status);
      const actualOutput = await teamService.getDashboardByTeamId(teamId_para);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('setLogo() will save the logo path into db', () => {
    test('test 1 if teamid is not present in DB', async () => {
      //inputs
      const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d481e';
      const path: string =
        'C:/powerboard/multimedia/46455bf7-ada7-495c-8019-8d7ab76d488e/logo/krishna46455bf7-ada7-495c-8019-8d7ab76d488e';

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);

      try {
        await teamService.setLogo(path, teamId);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }

      //expect
    });
    test('test 2 if teamid is present in DB', async () => {
      //inputs
      const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
      const path: string = 'krishna46455bf7-ada7-495c-8019-8d7ab76d488e';

      const team = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-07-07T12:22:21.770Z',
        updatedAt: '2021-07-07T12:22:21.770Z',
        name: 'Team A',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: '',
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-07-07T12:22:21.770Z',
          updatedAt: '2021-07-07T12:22:21.770Z',
          name: 'ADCenter Bangalore',
        },
      };
      const expectedOutput = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: 'krishna46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        updatedAt: '2021-07-07T12:22:21.770Z',
      };

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => expectedOutput);
      const actualOutput = await teamService.setLogo(path, teamId);
      expect(teamRepo.findOne).toBeCalledTimes(1);
      expect(teamRepo.save).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);

      //expect
    });
  });

  describe('fetchStatus method will return status of project', () => {
    test('test 1 if client status is null', () => {
      //inputs
      const dashboard: any = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: undefined,
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
      };

      const expectedOutput = undefined;

      //test
      const actualOutput = teamService.fetchStatus(dashboard);

      //expect
      expect(actualOutput).toEqual(expectedOutput);
    });

    test('test 1 if client status is null', () => {
      //inputs
      const dashboard: any = {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: { clientSatisfactionRating: 5, sprintNumber: 10 },
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
      };

      const expectedOutput = 1;

      //test
      const actualOutput = teamService.fetchStatus(dashboard);

      //expect
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getPowerboardByTeamId() get all 5 kpis details along with spirint and status', () => {
    test('test 1 if team not present in db ', async () => {
      //inputs
      const userTeam: UserTeamDTO = {
        userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d481e',
      };

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await teamService.getPowerboardByTeamId(userTeam);
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });

    test('test 2 if team present in db ', async () => {
      //inputs
      const userTeam: UserTeamDTO = {
        userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };
      const team: any = {
        id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-07-08T05:12:17.648Z',
        updatedAt: '2021-07-08T05:12:17.648Z',
        name: 'Team A',
        teamCode: '10012345',
        projectKey: 'P12343',
        logo: '',
        ad_center: {
          id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'ADCenter Bangalore',
        },
      };
      const isAdminOrGuest: any = true;
      const priviledgeList: any = [
        'add_team_admin',
        'view_meeting_links',
        'view_team_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
      ];
      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 26,
            remainingWork: 122,
            count: 8,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 2,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
        privileges: [],
      };

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(userService, 'isAdminOrGuest').mockImplementation(() => isAdminOrGuest);
      jest.spyOn(userService, 'getTeamPrivileges').mockImplementation(() => priviledgeList);
      jest.spyOn(teamService, 'getPowerboardResponseForTeam').mockImplementation(() => expectedOutput);
      const actualOutput = await teamService.getPowerboardByTeamId(userTeam);
      expect(teamRepo.findOne).toBeCalledTimes(1);
      expect(userService.isAdminOrGuest).toBeCalledTimes(1);
      expect(userService.getTeamPrivileges).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getPowerboardResponseForTeam()', () => {
    const dashboard: any = {
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
      clientStatus: { clientSatisfactionRating: 5, sprintNumber: 10 },
      teamSpirit: { teamSpiritRating: 7 },
      burndown: {
        workUnit: 'story point',
        remainingDays: 26,
        remainingWork: 122,
        count: 8,
        burndownStatus: 'Ahead Time',
      },
      sprintDetail: { Sprint_current_day: 2, sprint_number: 11, Sprint_days: 28 },
      velocity: { Avg: 115, Committed: 140, Completed: 18 },
      teamStatus: 1,
    };

    const powerBoardResponse: any = {
      team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      team_name: 'Team A',
      center: 'ADCenter Bangalore',
      team_code: '10012345',
      logo: '',
      dashboard: {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: {
          bugs: 3,
          debt: 13,
          codeCoverage: 85,
          status: 'PASSED',
        },
        clientStatus: {
          clientSatisfactionRating: 5,
          sprintNumber: 10,
        },
        teamSpirit: {
          teamSpiritRating: 7,
        },
        burndown: {
          workUnit: 'story point',
          remainingDays: 26,
          remainingWork: 122,
          count: 8,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: {
          Sprint_current_day: 2,
          sprint_number: 11,
          Sprint_days: 28,
        },
        velocity: {
          Avg: 115,
          Committed: 140,
          Completed: 18,
        },
        teamStatus: 1,
      },
      meetingLinks: [
        {
          dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
          type: 'TEAMS',
          title: 'Stand Up',
          links:
            'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
        },
      ],
      teamLinks: [
        {
          teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
          title: 'Jira Cloud',
          links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
        },
        {
          teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
          title: 'GitHub',
          links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
        },
      ],
      images: [
        {
          ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
          ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        },
        {
          ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
          ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
        },
        {
          ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
          ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
        },
        {
          ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
          ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
        },
        {
          ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
          ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
        },
      ],
      videos: [
        {
          videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
          videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
        },
        {
          videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
          videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
        },
      ],
    };

    const team: any = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-07-08T05:12:17.648Z',
      updatedAt: '2021-07-08T05:12:17.648Z',
      name: 'Team A',
      teamCode: '10012345',
      projectKey: 'P12343',
      logo: '',
      ad_center: {
        id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
        version: 1,
        createdAt: '2021-07-08T05:12:17.648Z',
        updatedAt: '2021-07-08T05:12:17.648Z',
        name: 'ADCenter Bangalore',
      },
    };
    test('test 1 if user is admin or guest then they get empty priviledge list', async () => {
      //inputs

      const isAdminOrGuest: any = true;
      const priviledgeList: any = [
        'add_team_admin',
        'view_meeting_links',
        'view_team_links',
        'team_configuration',
        'register_team',
        'update_team',
        'delete_team',
        'view_all_team',
        'view_members_of_team',
        'update_role',
        'delete_team_members',
        'add_team_member',
        'add_guest_user',
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 26,
            remainingWork: 122,
            count: 8,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 2,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
        privileges: [],
      };

      //test
      jest.spyOn(teamService, 'getDashboardByTeamId').mockImplementation(() => dashboard);
      jest.spyOn(teamService, 'getOtherComponentsDetailByTeamId').mockImplementation(() => powerBoardResponse);
      const actualOutput = await teamService.getPowerboardResponseForTeam(team, priviledgeList, isAdminOrGuest);

      //expect
      expect(teamService.getDashboardByTeamId).toBeCalledTimes(1);
      expect(teamService.getOtherComponentsDetailByTeamId).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
    test('test 2 if user is not admin or guest then they get empty priviledge list', async () => {
      //inputs

      const isAdminOrGuest: any = false;
      const priviledgeList: any = [
        'view_meeting_links',
        'view_team_links',
        'team_configuration',
        'view_members_of_team',
        'delete_team_members',
        'add_team_member',
      ];

      const powerBoardResponse: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 26,
            remainingWork: 122,
            count: 8,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 2,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
      };

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 26,
            remainingWork: 122,
            count: 8,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 2,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
        privileges: [
          'view_meeting_links',
          'view_team_links',
          'team_configuration',
          'view_members_of_team',
          'delete_team_members',
          'add_team_member',
        ],
      };

      //test
      jest.spyOn(teamService, 'getDashboardByTeamId').mockImplementation(() => dashboard);
      jest.spyOn(teamService, 'getOtherComponentsDetailByTeamId').mockImplementation(() => powerBoardResponse);
      const actualOutput = await teamService.getPowerboardResponseForTeam(team, priviledgeList, isAdminOrGuest);

      //expect
      expect(teamService.getDashboardByTeamId).toBeCalledTimes(1);
      expect(teamService.getOtherComponentsDetailByTeamId).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getOtherComponentsDetailByTeamId() get all the other components except dashboard', () => {
    const team_id: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';

    const powerBoardResponse: any = {
      team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      team_name: 'Team A',
      center: 'ADCenter Bangalore',
      team_code: '10012345',
      logo: '',
      dashboard: {
        teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        codeQuality: { bugs: 3, debt: 13, codeCoverage: 85, status: 'PASSED' },
        clientStatus: { clientSatisfactionRating: 5, sprintNumber: 10 },
        teamSpirit: { teamSpiritRating: 7 },
        burndown: {
          workUnit: 'story point',
          remainingDays: 25,
          remainingWork: 122,
          count: 3,
          burndownStatus: 'Ahead Time',
        },
        sprintDetail: { Sprint_current_day: 3, sprint_number: 11, Sprint_days: 28 },
        velocity: { Avg: 115, Committed: 140, Completed: 18 },
        teamStatus: 1,
      },
    };

    const images: any = [
      {
        ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
        ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
      },
      {
        ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
        ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
      },
      {
        ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
        ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
      },
      {
        ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
        ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
      },
      {
        ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
        ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
      },
    ];

    const videos: any = [
      {
        videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
        videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
      },
      {
        videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
        videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
      },
    ];

    test('test 1 when user have all the priledges', async () => {
      //inputs
      const priviledgesList: any = ['view_meeting_links', 'view_team_links'];

      const dailyMeeting: any = [
        {
          dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
          type: 'TEAMS',
          title: 'Stand Up',
          links:
            'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
        },
      ];

      const teamLink: any = [
        {
          teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
          title: 'Jira Cloud',
          links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
        },
        {
          teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
          title: 'GitHub',
          links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
        },
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 25,
            remainingWork: 122,
            count: 3,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 3,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
      };

      //test
      jest.spyOn(dailyMeetingLinkService, 'getDailyLinks').mockImplementation(() => dailyMeeting);
      jest.spyOn(teamLinkService, 'getTeamLinks').mockImplementation(() => teamLink);
      jest.spyOn(imageService, 'getImagesForTeam').mockImplementation(() => images);
      jest.spyOn(videoService, 'getVideosForTeam').mockImplementation(() => videos);
      const actualOutput = await teamService.getOtherComponentsDetailByTeamId(
        team_id,
        priviledgesList,
        powerBoardResponse,
      );

      //expect
      expect(dailyMeetingLinkService.getDailyLinks).toBeCalledTimes(1);
      expect(teamLinkService.getTeamLinks).toBeCalledTimes(1);
      expect(imageService.getImagesForTeam).toBeCalledTimes(1);
      expect(videoService.getVideosForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
    test('test 2 when user do not have priledges for viewing team & meeting links', async () => {
      //inputs
      const priviledgesList: any = [];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 25,
            remainingWork: 122,
            count: 3,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 3,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [],
        teamLinks: [],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
      };

      //test
      jest.spyOn(imageService, 'getImagesForTeam').mockImplementation(() => images);
      jest.spyOn(videoService, 'getVideosForTeam').mockImplementation(() => videos);
      const actualOutput = await teamService.getOtherComponentsDetailByTeamId(
        team_id,
        priviledgesList,
        powerBoardResponse,
      );

      //expect
      expect(imageService.getImagesForTeam).toBeCalledTimes(1);
      expect(videoService.getVideosForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });

    test('test 3 when user have priledges to view team links', async () => {
      //inputs
      const priviledgesList: any = ['view_team_links'];

      const teamLink: any = [
        {
          teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
          title: 'Jira Cloud',
          links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
        },
        {
          teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
          title: 'GitHub',
          links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
        },
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 25,
            remainingWork: 122,
            count: 3,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 3,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [],
        teamLinks: [
          {
            teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
            title: 'Jira Cloud',
            links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
          },
          {
            teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
            title: 'GitHub',
            links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
          },
        ],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
      };

      //test
      jest.spyOn(teamLinkService, 'getTeamLinks').mockImplementation(() => teamLink);
      jest.spyOn(imageService, 'getImagesForTeam').mockImplementation(() => images);
      jest.spyOn(videoService, 'getVideosForTeam').mockImplementation(() => videos);
      const actualOutput = await teamService.getOtherComponentsDetailByTeamId(
        team_id,
        priviledgesList,
        powerBoardResponse,
      );

      //expect
      expect(teamLinkService.getTeamLinks).toBeCalledTimes(1);
      expect(imageService.getImagesForTeam).toBeCalledTimes(1);
      expect(videoService.getVideosForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });

    test('test 4 when user have priledges only for viewing meeting links', async () => {
      //inputs
      const priviledgesList: any = ['view_meeting_links'];

      const dailyMeeting: any = [
        {
          dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
          type: 'TEAMS',
          title: 'Stand Up',
          links:
            'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
        },
      ];

      const expectedOutput: any = {
        team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        team_name: 'Team A',
        center: 'ADCenter Bangalore',
        team_code: '10012345',
        logo: '',
        dashboard: {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          codeQuality: {
            bugs: 3,
            debt: 13,
            codeCoverage: 85,
            status: 'PASSED',
          },
          clientStatus: {
            clientSatisfactionRating: 5,
            sprintNumber: 10,
          },
          teamSpirit: {
            teamSpiritRating: 7,
          },
          burndown: {
            workUnit: 'story point',
            remainingDays: 25,
            remainingWork: 122,
            count: 3,
            burndownStatus: 'Ahead Time',
          },
          sprintDetail: {
            Sprint_current_day: 3,
            sprint_number: 11,
            Sprint_days: 28,
          },
          velocity: {
            Avg: 115,
            Committed: 140,
            Completed: 18,
          },
          teamStatus: 1,
        },
        meetingLinks: [
          {
            dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
            type: 'TEAMS',
            title: 'Stand Up',
            links:
              'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
          },
        ],
        teamLinks: [],
        images: [
          {
            ImageId: 'aaad19f7-1b66-44aa-a443-4fcdd173f385',
            ImagePath: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          },
          {
            ImageId: '89cbb47b-5454-440d-a0e8-98b681ed6f83',
            ImagePath: 'Capgeminie399d4d7-5119-4c2b-b238-4275d2f7c5da.jpg',
          },
          {
            ImageId: 'fbf8ea11-62a2-433a-936f-9fddfb90b1c6',
            ImagePath: 'chare72e95bb-b552-425a-a051-b7dfc69efa0b.jpg',
          },
          {
            ImageId: 'dc6a6a55-23f9-4edf-90e5-a18c6b07a0be',
            ImagePath: 'dataf74b26af-7a68-42c9-94b8-b4ebc378dce1.jpg',
          },
          {
            ImageId: '8c4f8d5d-b3b7-4efb-868e-4336474094b3',
            ImagePath: 'france-capgeminic4ba8e67-c56d-446d-814e-9ab149521959.jpg',
          },
        ],
        videos: [
          {
            videoId: '79b90a96-bd52-4fab-9b8f-e119cf4e66ab',
            videoPath: 'CapgeminiPurpose1c42fff2-6884-40bd-a8f0-489552af140f.mp4',
          },
          {
            videoId: '0176b6eb-6336-4efc-9710-edfc4af25a31',
            videoPath: 'CapgeminiValues499f846a-780c-4a9a-86c9-99d3055f7d1e.mp4',
          },
        ],
      };

      //test
      jest.spyOn(dailyMeetingLinkService, 'getDailyLinks').mockImplementation(() => dailyMeeting);
      jest.spyOn(imageService, 'getImagesForTeam').mockImplementation(() => images);
      jest.spyOn(videoService, 'getVideosForTeam').mockImplementation(() => videos);
      const actualOutput = await teamService.getOtherComponentsDetailByTeamId(
        team_id,
        priviledgesList,
        powerBoardResponse,
      );

      //expect
      expect(dailyMeetingLinkService.getDailyLinks).toBeCalledTimes(1);
      expect(imageService.getImagesForTeam).toBeCalledTimes(1);
      expect(videoService.getVideosForTeam).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('getAllTeams() will return all the teams available in DB', () => {
    test('test 1 if no teams available in DB', async () => {
      //inputs
      const teamList: any = [];

      //test
      jest.spyOn(teamRepo, 'find').mockImplementation(() => teamList);

      try {
        await teamService.getAllTeams();
      } catch (e) {
        expect(e.message).toMatch('Team Not Found');
      }
    });

    test('test 2 if teams available in DB', async () => {
      //inputs
      const teamList: any = [
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d491e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'Team D',
          teamCode: '10033347',
          projectKey: 'P43567',
          logo: '',
          ad_center: {
            id: '98755bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-07-08T05:12:17.648Z',
            updatedAt: '2021-07-08T05:12:17.648Z',
            name: 'ADCenter Mumbai',
          },
        },
        {
          id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'Team E',
          teamCode: '9900918',
          projectKey: 'P112461',
          logo: '',
          ad_center: {
            id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-07-08T05:12:17.648Z',
            updatedAt: '2021-07-08T05:12:17.648Z',
            name: 'ADCenter Murcia',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'Team C',
          teamCode: '10012347',
          projectKey: 'P87695',
          logo: '',
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-07-08T05:12:17.648Z',
            updatedAt: '2021-07-08T05:12:17.648Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d489e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'Team B',
          teamCode: '10012346',
          projectKey: 'P1212',
          logo: '',
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-07-08T05:12:17.648Z',
            updatedAt: '2021-07-08T05:12:17.648Z',
            name: 'ADCenter Bangalore',
          },
        },
        {
          id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'Team A',
          teamCode: '10012345',
          projectKey: 'P12343',
          logo: null,
          ad_center: {
            id: '99055bf7-ada7-495c-8019-8d7ab62d488e',
            version: 1,
            createdAt: '2021-07-08T05:12:17.648Z',
            updatedAt: '2021-07-08T05:12:17.648Z',
            name: 'ADCenter Bangalore',
          },
        },
      ];

      const expectedOutput: any = [
        {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d491e',
          teamName: 'Team D',
          teamCode: '10033347',
          projectKey: 'P43567',
          adCenter: 'ADCenter Mumbai',
        },
        {
          teamId: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
          teamName: 'Team E',
          teamCode: '9900918',
          projectKey: 'P112461',
          adCenter: 'ADCenter Murcia',
        },
        {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d490e',
          teamName: 'Team C',
          teamCode: '10012347',
          projectKey: 'P87695',
          adCenter: 'ADCenter Bangalore',
        },
        {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d489e',
          teamName: 'Team B',
          teamCode: '10012346',
          projectKey: 'P1212',
          adCenter: 'ADCenter Bangalore',
        },
        {
          teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
          teamName: 'Team A',
          teamCode: '10012345',
          projectKey: 'P12343',
          adCenter: 'ADCenter Bangalore',
        },
      ];

      //test
      jest.spyOn(teamRepo, 'find').mockImplementation(() => teamList);

      const actualOutput = await teamService.getAllTeams();
      expect(teamRepo.find).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
  });

  describe('addTeam() method will add team in powerboard as well as in team spirit app', () => {
    test('test 1 when team is not registered previously', async () => {
      //inputs
      const addTeam: any = {
        teamName: 'test_demo',
        teamCode: '9900111',
        projectKey: 'P112499',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
        },
        member_number: 2,
        frequency: 15,
        start_date: '2021-06-03T00:00:00Z',
      };

      const team = undefined;

      const expectedOutput: any = {
        name: 'test_demo',
        teamCode: '9900111',
        projectKey: 'P112499',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
        },
        logo: null,
        id: '27fefe8f-e89d-4f2f-a58a-9b9185a29a95',
        version: 1,
        createdAt: '2021-07-08T12:44:00.140Z',
        updatedAt: '2021-07-08T12:44:00.140Z',
      };

      const token: any = {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImFkbWluVGVhbVNwaXJpdEBjYXBnZW1pbmkuY29tIiwiUGFzc3dvcmQiOiJUZWFtU3Bpcml0QWRtaW4hIiwiZXhwIjoxNjI2MDA3NDQwfQ.bScKraBERoT4tr9jkb3pHNVXzjv2I4Ki4ob3j2sGiQ4',
      };

      const teamSpiritOutput: any = {
        Name: 'test_demo',
        Num_mumbers: 2,
        StartDate: '2021-06-03T00:00:00Z',
        Frequency: 15,
        Surveys: null,
        Users: null,
      };

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);
      jest.spyOn(teamRepo, 'save').mockImplementation(() => expectedOutput);
      jest.spyOn(teamSpiritService, 'loginToTeamSpirit').mockImplementation(() => token);
      jest.spyOn(teamSpiritService, 'addTeamToTeamSpirit').mockImplementation(() => teamSpiritOutput);
      const actualOutput = await teamService.addTeam(addTeam);

      //expect
      expect(teamRepo.findOne).toBeCalledTimes(1);
      expect(teamRepo.save).toBeCalledTimes(1);
      expect(teamSpiritService.loginToTeamSpirit).toBeCalledTimes(1);
      expect(teamSpiritService.addTeamToTeamSpirit).toBeCalledTimes(1);
      expect(actualOutput).toBeDefined();
      expect(actualOutput).toEqual(expectedOutput);
    });
    test('test 2 when team is already registered with powerboard', async () => {
      //inputs
      const team: any = {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        version: 1,
        createdAt: '2021-07-08T05:12:17.648Z',
        updatedAt: '2021-07-08T05:12:17.648Z',
        name: 'Team E',
        teamCode: '9900918',
        projectKey: 'P112461',
        logo: null,
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
          version: 1,
          createdAt: '2021-07-08T05:12:17.648Z',
          updatedAt: '2021-07-08T05:12:17.648Z',
          name: 'ADCenter Murcia',
        },
      };

      const addTeam: any = {
        teamName: 'test_demo',
        teamCode: '9900111',
        projectKey: 'P112499',
        ad_center: {
          id: '98955bf7-ada7-495c-8019-8d7ab62d488e',
        },
        member_number: 2,
        frequency: 15,
        start_date: '2021-06-03T00:00:00Z',
      };

      //test
      jest.spyOn(teamRepo, 'findOne').mockImplementation(() => team);

      //expect
      try {
        await teamService.addTeam(addTeam);
      } catch (e) {
        expect(e.message).toMatch('team already registered');
      }
    });
  });
});
