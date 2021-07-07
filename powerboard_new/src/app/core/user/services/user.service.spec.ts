import { HttpService } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http/http.module';
//import { HttpModule } from '@nestjs/common/http/http.module';
import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  TeamSpiritRepositoryMock,
  UserInfoRepositoryMock,
  UserRepositoryMock,
  UserRoleRepositoryMock,
  UserTeamRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { TeamSpiritMedian } from '../../../dashboard/team-spirit-integration/model/entities/team-spirit-median.entity';
//import { TeamSpirit } from '../../../dashboard/team-spirit-integration/model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { UserDTO } from '../model/dto/UserDTO';

//import { UserDTO } from '../model/dto/UserDTO';
//import { TeamSpiritModule } from '../../../dashboard/team-spirit-integration/team-spirit.module';

import { User } from '../model/entities/user.entity';
import { UserInfo } from '../model/entities/user_info.entity';
import { UserRole } from '../model/entities/user_role.entity';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpservice: HttpService;
  let userRepo: UserRepositoryMock;
  let userRoleRepo: UserRoleRepositoryMock;
  let userTeamRepo: UserTeamRepositoryMock;
  let userInfoRepo: UserInfoRepositoryMock;
  let teamSpiritRepo: TeamSpiritRepositoryMock;
  let teamSpiritService: TeamSpiritCrudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UserService,
        TeamSpiritCrudService,

        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
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
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    httpservice = module.get<HttpService>(HttpService);
    userRepo = module.get<UserRepositoryMock>(getRepositoryToken(User));
    userRoleRepo = module.get<UserRoleRepositoryMock>(getRepositoryToken(UserRole));
    userTeamRepo = module.get<UserTeamRepositoryMock>(getRepositoryToken(UserTeam));
    userInfoRepo = module.get<UserInfoRepositoryMock>(getRepositoryToken(UserInfo));
    teamSpiritRepo = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
    teamSpiritService = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
  });

  it('should be defined after module initialization', () => {
    expect(userService).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(userRoleRepo).toBeDefined();
    expect(userTeamRepo).toBeDefined();
    expect(userInfoRepo).toBeDefined();
    expect(teamSpiritRepo).toBeDefined();
    expect(httpservice).toBeDefined();
  });

  it('findUser() should return the User successfully if the user is present', async () => {
    const userName = 'Diamler Deveops';
    const user = new User();
    jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
    expect(await userService.findOne(userName)).toEqual(user);
  });

  describe('addUserToOtherTeam()', () => {
    const actualUser = {
      id: '83917c53-fcf9-430e-b15c-61dcf5bc97d7',
      version: 1,
      createdAt: '2021-07-06T09:54:59.595Z',
      updatedAt: '2021-07-06T09:54:59.595Z',
      username: 'john123',
      password: '$2b$12$DrXxSYq9dyjOR.eKTYULv.1/ZVt3ZZT0.2kXxam7R9APJf3.3PsDq',
      email: 'john123@mail.com',
    } as User;
    const userDTO = {
      username: 'john123',
      fullName: 'john doe',
      email: 'john123@mail.com',
      role: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      team: { id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1', name: 'Maruti' },
    } as UserDTO;

    const userRole = {
      id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      version: 1,
      createdAt: '2021-06-25T08:25:00.982Z',
      updatedAt: '2021-06-25T08:25:00.982Z',
      roleName: 'team_member',
      description: null,
      privilege: [
        {
          id: '80021dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          privilegeName: 'view_meeting_links',
          description: 'For viewing meetings',
        },
        {
          id: '80031dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          privilegeName: 'view_team_links',
          description: 'For viewing team links',
        },
      ],
    };
    const userTeam = new UserTeam();

    it('addUserToOtherTeam() should throw error if the user is already present in the team', async () => {
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);

      try {
        await userService.addUserToOtherTeam(actualUser, userDTO);
      } catch (e) {
        expect(e.message).toMatch('User in team already exists');
      }
      //expect(await userService.addUserToOtherTeam(actualUser, userDTO)).toThrow(new ConflictException('User in team already exists'));
    });

    it('addUserToOtherTeam() should successfully add user to the team ', async () => {
      // const teamSpiritUserDTO = {
      //   Email: 'adminTeamSpirit@capgemini.com',
      //   Password: 'TeamSpiritAdmin!'
      // }
      const token = 'token';
      const userAddedToTeamSpirit = {};
      jest.spyOn(teamSpiritService, 'loginToTeamSpirit').mockResolvedValue(() => token);
      jest.spyOn(teamSpiritService, 'addUserToTeam').mockResolvedValue(() => userAddedToTeamSpirit);
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'save').mockImplementation(() => userTeam);
      const actualResponse = await userService.addUserToOtherTeam(actualUser, userDTO);
      expect(actualResponse).toEqual(userTeam);
    });
  });

  // describe('registerUser() should register the User successfully if the user is not already present', async () => {

  //   const userDTO = {} as UserDTO;
  //   const registeredUser = new User();
  //   // const userDTO:UserDTO = {
  //   //   username: "john",
  //   //   fullName: "john doe",
  //   //   email: "john@mail.com",
  //   //   role: "555f1dfd-43e9-4cc4-8257-a6ba5c70e34d",
  //   //   team: {
  //   //     id: "fe4f8120-8a2c-47ad-bad7-86e412e323c1",
  //   //     name: "Maruti"
  //   //   }
  //   // }

  //   jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
  //   const actualResponse = await userService.registerUser(userDTO);
  //   expect(userRepo.findOne).toHaveBeenCalled();
  //   expect(actualResponse).toEqual(registeredUser);

  // })
});
