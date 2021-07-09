import { HttpModule, HttpService } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
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
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { DailyMeeting } from '../../../daily-links/model/entities/daily-meeting.entity';
import { DailyMeetingCrudService } from '../../../daily-links/services/daily-meeting.crud.service';
import { ADCenter } from '../../../dashboard/ad-center/model/entities/ad-center.entity';
import { ADCenterCrudService } from '../../../dashboard/ad-center/services/ad-center.crud.service';
import { BusinessUnit } from '../../../dashboard/business-units/model/entities/business-unit.entity';
import { ClientStatus } from '../../../dashboard/client-status/model/entities/client-status.entity';
import { ClientStatusCrudService } from '../../../dashboard/client-status/services/client-status.crud.service';
import { CodeQualitySnapshot } from '../../../dashboard/code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from '../../../dashboard/code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { Sprint } from '../../../dashboard/sprint/model/entities/sprint.entity';
import { SprintCrudService } from '../../../dashboard/sprint/services/sprint.crud.service';
import { TeamSpiritMedian } from '../../../dashboard/team-spirit-integration/model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from '../../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { Images } from '../../../multimedia/images/model/entities/image.entity';
import { ImagesCrudService } from '../../../multimedia/images/services/images.crud.service';
import { Videos } from '../../../multimedia/videos/model/entities/videos.entity';
import { VideosCrudService } from '../../../multimedia/videos/services/videos.crud.service';
import { TeamLinks } from '../../../team-links/model/entities/team-links.entity';
import { TeamLinksCrudService } from '../../../team-links/services/team-links.crud.service';
import { Team } from '../../../teams/model/entities/team.entity';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { Visibility } from '../../../visibility/model/entities/visibility.entity';
import { VisibilityCrudService } from '../../../visibility/services/visibility.crud.service';
import { User } from '../../user/model/entities/user.entity';
import { UserInfo } from '../../user/model/entities/user_info.entity';
import { UserRole } from '../../user/model/entities/user_role.entity';
import { UserTeam } from '../../user/model/entities/user_team.entity';
import { UserService } from '../../user/services/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let teamService: TeamCrudService;
  let authService: AuthService;
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
  //let jwtService: JwtService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        JwtModule.register({
          secret: 'SECRET',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        ADCenterCrudService,
        TeamCrudService,
        AuthService,
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
        //JwtService,
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
    // jwtService = module.get<JwtService>(JwtService);
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
    //expect(jwtService).toBeDefined();
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

  describe('validateUser', () => {
    it('should validate that the user and return it when the user exists and password match.', async () => {
      await expect(authService.validateUser('user1', 'user1')).resolves.toStrictEqual({
        id: '1',
        username: 'user1',
        // password: 'user1',
        password: '$2b$12$KgUSTFUTjRqQD7U7tuV9quheR4L.LOAT.GhmTjBIXsgLMhBXjfhYq',
        email: 'user2@mail.com',
        UserTeam: [],
      });
      await expect(authService.validateUser('user2', 'user2')).resolves.toStrictEqual({
        id: '2',
        username: 'user2',
        // password: 'user2',
        password: '$2b$12$jDy/bJV0p6mYRlEjZL5t0OX9jinlfEiQDfuApJJGSVW6Ca/hiVbBW',
        email: 'user2@mail.com',
        UserTeam: [],
      });
    });

    it('should return undefined when the user does not exists or password does not match.', async () => {
      // await expect(authService.validateUser('test', 'user1')).resolves.toBeUndefined();
      await expect(authService.validateUser('user1', 'test')).resolves.toBeUndefined();
    });
  });

  // describe('login', () => {
  //   it('should return a JWT token when a valid user is provided', async () => {
  //     const token = await authService.login({
  //       username: 'user1',
  //       password: 'user1',
  //     } as any);

  //     expect(token).toBeDefined();
  //     expect(typeof token).toBe('string');
  //   });
  //   it('should return a exception when a invalid user is provided', async () => {
  //     await expect(
  //       authService.login({
  //         username: 'user1',
  //         password: 'user2',
  //       } as any),
  //     ).rejects.toThrow(UnauthorizedException);
  //   });
  // });

  // describe('register', () => {
  //   it('should register a new user if not exists', async () => {
  //     const newUser: any = {
  //       id: 3,
  //       username: 'user3',
  //       password: 'user3',
  //     };

  //     const user = await authService.register(newUser);
  //     expect(user).toBeDefined();
  //     expect(user).toEqual(await userService.findOne('user3'));
  //   });
  //   it('should throw an error if user exists', async () => {
  //     const newUser: any = {
  //       id: 3,
  //       username: 'user3',
  //       password: 'user3',
  //     };

  //     await expect(authService.register(newUser)).rejects.toThrow('User already exists');
  //   });
  // });
});
