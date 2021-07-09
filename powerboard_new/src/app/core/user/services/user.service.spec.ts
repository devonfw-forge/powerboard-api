import { HttpService } from '@nestjs/common';
import { HttpModule } from '@nestjs/common/http/http.module';
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
import { Team } from '../../../teams/model/entities/team.entity';
import { ChangePasswordDTO } from '../../auth/model/ChangePasswordDTO';
import { AddGuestDTO } from '../model/dto/AddGuestDTO';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { UserDTO } from '../model/dto/UserDTO';
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
      team: { id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1', name: 'Team E' },
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
    });

    it('addUserToOtherTeam() should successfully add user to the team if it is not present in the team', async () => {
      const token = 'token';
      const userAddedToTeamSpirit = {};
      jest.spyOn(teamSpiritService, 'loginToTeamSpirit').mockResolvedValue(() => token);
      jest.spyOn(teamSpiritService, 'addUserToTeam').mockResolvedValue(userAddedToTeamSpirit);
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'save').mockImplementation(() => userTeam);
      const actualResponse = await userService.addUserToOtherTeam(actualUser, userDTO);
      expect(actualResponse).toEqual(userTeam);
    });
  });

  describe('registerUser', () => {
    const userDTO = {
      username: 'Don123',
      fullName: ' Don',
      email: 'don123@mail.com',
      role: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      team: {
        id: 'fe4f8120-8a2c-47ad-bad7-86e412e323c1',
        name: 'Team E',
      },
    } as UserDTO;

    const registeredUser = {
      username: 'Don123',
      password: '$2b$12$JJWE6fH5ETCT6V0CaIqKg.SykLpP355W89Gizxn3T35VW1vE/LNh6',
      email: 'don123@mail.com',
      id: '647f8ce6-b5c4-4935-b5ae-816053477065',
      version: 1,
      createdAt: '2021-07-08T04:21:47.308Z',
      updatedAt: '2021-07-08T04:21:47.308Z',
    };

    it('registerUser() should register the User successfully if the user is not already present', async () => {
      // const userDTO = {} as UserDTO;

      const registerUserToOtherTeam = new UserTeam();

      //const registerUserToOtherTeam = undefined;
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      jest.spyOn(userRepo, 'save').mockImplementation(() => registeredUser);
      jest.spyOn(userService, 'addUserToOtherTeam').mockResolvedValue(registerUserToOtherTeam);
      const actualResponse = await userService.registerUser(userDTO);
      expect(actualResponse).toEqual(registerUserToOtherTeam);
    });
    it('registerUser() should successfully register the existing user to other team', async () => {
      const user = new User();
      const userTeam = new UserTeam();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      jest.spyOn(userService, 'addUserToOtherTeam').mockResolvedValue(userTeam);
      expect(await userService.registerUser(userDTO)).toEqual(userTeam);
    });

    it('registerUser() should throw error message if the user is already present in that team', async () => {
      const user = new User();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      const message = 'User in team already exists';
      jest.spyOn(userService, 'addUserToOtherTeam').mockResolvedValue(message);
      const actualResponse = await userService.registerUser(userDTO);
      expect(actualResponse).toEqual(message);
    });
  });

  describe('addGuestUser()', () => {
    const guestUserDTO = {
      username: 'siva',
      email: 'siva@mail.com',
      role: '558f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
    } as AddGuestDTO;

    const user = new User();

    const userTeam = new UserTeam();
    it('addGuestUser() should add the guest user successfully if the user id is for guest user and the user is not already present  ', async () => {
      const userRole = {
        id: '558f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'guest_user',
        description: null,
        privilege: [],
      };
      jest.spyOn(userRoleRepo, 'findOne').mockResolvedValue(userRole);
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(undefined);
      jest.spyOn(userRepo, 'save').mockResolvedValue(user);
      jest.spyOn(userTeamRepo, 'save').mockResolvedValue(userTeam);
      expect(await userService.addGuest(guestUserDTO)).toEqual(user);
    });

    it('addGuestUser() should throw error if the user role id is not of guest user  ', async () => {
      const userRole = {
        id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'guest_user',
        description: null,
        privilege: [],
      };

      jest.spyOn(userRoleRepo, 'findOne').mockResolvedValue(userRole);
      try {
        expect(await userService.addGuest(guestUserDTO));
      } catch (e) {
        expect(e.message).toMatch('User is not guest, Try diffrent method to register diffrent users');
      }
    });
    it('addGuestUser() should throw error if the user is already present  ', async () => {
      const user = new User();
      const userRole = {
        id: '558f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'guest_user',
        description: null,
        privilege: [],
      };

      jest.spyOn(userRepo, 'findOne').mockResolvedValue(user);
      jest.spyOn(userRoleRepo, 'findOne').mockResolvedValue(userRole);
      try {
        expect(await userService.addGuest(guestUserDTO));
      } catch (e) {
        expect(e.message).toMatch('user already registered');
      }
    });
  });
  describe('deleteUserFromTeamById()', () => {
    it('deleteUserFromTeamById() should delete the user from team if it is present there  ', async () => {
      const userTeamID = '83917c53-fcf9-430e-b15c-61dcf5bc97d7';
      const thisUser = new User();
      const existingteam = new Team();
      const userTeam = {
        user: thisUser,
        team: existingteam,
        id: userTeamID,
      };
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(await userService.deleteUserFromTeamById(userTeamID)).toBe(undefined);
    });
  });

  it('deleteUserFromTeamById() should delete the user from team if it is present there  ', async () => {
    const userTeamID = '83917c53-fcf9-430e-b15c-61dcf5bc97d9';
    jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => undefined);
    try {
      expect(await userService.deleteUserFromTeamById(userTeamID));
    } catch (e) {
      expect(e.message).toMatch('user not found for that team');
    }
  });

  describe('updateUserRole()', () => {
    const updateUserRoleDTO = {} as UpdateUserRoleDTO;

    it('updateUserRole should successfully update the user role', async () => {
      const userRole = new UserRole();
      //const thisUser = new User();
      const userTeam = new UserTeam();

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);

      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'save').mockImplementation(() => userTeam);
      expect(await userService.updateUserRole(updateUserRoleDTO)).toEqual(userTeam);
    });

    it('updateUserRole should successfully update the user role', async () => {
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userService.updateUserRole(updateUserRoleDTO);
      } catch (e) {
        expect(e.message).toMatch('User in team not found');
      }
    });
  });

  describe('getTeamPrivileges()', () => {
    describe('getPrivilegesList()', () => {
      it(' getPrivilegesList() method should return all the privileges of that particular user', async () => {
        const user = new User();
        const team = new Team();
        const userRole = {
          id: '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
          version: 1,
          createdAt: '2021-06-25T08:25:00.982Z',
          updatedAt: '2021-06-25T08:25:00.982Z',
          roleName: 'team_member',
          description: '',
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
        const userTeam: any = {
          user: user,
          team: team,
          role: userRole,
        };
        const privilegesName = ['view_meeting_links', 'view_team_links'];
        expect(userService.getPrivilegesList(userTeam)).toEqual(privilegesName);
      });
    });
    describe('getAllPrivileges()', () => {
      const user = new User();
      user.id = '647f8ce6-b5c4-4935-b5ae-816053477065';
      it('getAllPrivileges() method should return all the privileges of that particular user if the user is present', async () => {
        const privilegesName: string[] = ['view_meeting_links', 'view_team_links'];
        const userTeam = new UserTeam();
        jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
        jest.spyOn(userService, 'getPrivilegesList').mockImplementation(() => privilegesName);
        expect(await userService.getAllPrivileges(user.id)).toEqual(privilegesName);
      });

      it('getAllPrivileges() method should throw error if the user is not present', async () => {
        jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => undefined);
        try {
          await userService.getAllPrivileges(user.id);
        } catch (e) {
          expect(e.message).toMatch('privileges not found');
        }
      });
    });
  });

  describe('changePassword()', () => {
    const changePasswordDTO = {
      userId: '35afbdf8-9035-4bc6-ae04-28c6140495ad',
      oldPassword: 'password',
      newPassword: 'siva456',
    } as ChangePasswordDTO;

    it('changePassword() method should change the password of a user successfully if user is present', async () => {
      const user = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
        email: 'siva@capgemini.com',
      } as User;

      //const updatedUser = new User();
      const updatedUser = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fm',
        email: 'siva@capgemini.com',
      } as User;

      const userInfo = new UserInfo();
      userInfo.userId = user.id;
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);
      jest.spyOn(userRepo, 'save').mockImplementation(() => updatedUser);
      jest.spyOn(userInfoRepo, 'save').mockImplementation(() => userInfo);
      expect(await userService.changePassword(changePasswordDTO)).toEqual(updatedUser);
    });

    it(' method should throw error if user is not present', async () => {
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userService.changePassword(changePasswordDTO);
      } catch (e) {
        expect(e.message).toMatch('User Not found');
      }
    });
  });

  describe('isAdminOrGuest()', () => {
    const userId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
    const user = new User();
    const team = new Team();
    it(' method should return true if the user role name is system_admin', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'system_admin',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userService.isAdminOrGuest(userId)).resolves.toStrictEqual(true);
      //expect(userService.isAdminOrGuest(userId)).toBeTruthy();
    });
    it(' method should return true if the user role name is guest_user', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'guest_user',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };

      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userService.isAdminOrGuest(userId)).resolves.toStrictEqual(true);
    });

    it(' method should return false if the user role name is not system_admin or guest_user', async () => {
      const userRole = {
        id: '557f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        roleName: 'team_admin',
        description: '',
        privilege: [],
      };
      const userTeam = {
        user: user,
        team: team,
        role: userRole,
      };
      jest.spyOn(userTeamRepo, 'findOne').mockImplementation(() => userTeam);
      expect(userService.isAdminOrGuest(userId)).resolves.toStrictEqual(false);
    });
  });
  describe('getAllUserRoles()', () => {
    it('getAllUserRoles() should fetch all user roles', async () => {
      const userRoles: UserRole[] = [];
      const roleList = new Array();
      jest.spyOn(userRoleRepo, 'find').mockImplementation(() => userRoles);
      expect(await userService.getAllUserRoles()).toEqual(roleList);
    });

    it('getAllUserRoles() should throw error if user is not present', async () => {
      jest.spyOn(userRoleRepo, 'find').mockImplementation(() => undefined);
      try {
        await userService.getAllUserRoles();
      } catch (e) {
        expect(e.message).toMatch('No Roles Found');
      }
    });
  });

  describe('getAllGuestUsers()', () => {
    const userRole = {
      id: '558f1dfd-43e9-4cc4-8257-a6ba5c70e34d',
      version: 1,
      createdAt: '2021-06-25T08:25:00.982Z',
      updatedAt: '2021-06-25T08:25:00.982Z',
      roleName: 'guest_user',
      description: '',
      privilege: [],
    };

    it('getAllGuestUsers() should fetch all guest users', async () => {
      const user = {
        id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
        version: 1,
        createdAt: '2021-07-06T09:54:59.595Z',
        updatedAt: '2021-07-06T09:54:59.595Z',
        username: 'siva11',
        password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
        email: 'siva@capgemini.com',
      } as User;

      const team = new Team();

      const userTeams = [
        {
          user: user,
          team: team,
          role: userRole,
        },
      ];

      const guests = [
        {
          id: '11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d',
          version: 1,
          createdAt: '2021-07-06T09:54:59.595Z',
          updatedAt: '2021-07-06T09:54:59.595Z',
          username: 'siva11',
          password: '$2b$12$.hA7MmRGIzsr7v.eYFRtuOUTNw5WEqkGPcE92EX6opaiVMbr77fme',
          email: 'siva@capgemini.com',
        },
      ] as User[];

      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'find').mockImplementation(() => userTeams);
      expect(await userService.getAllGuestUsers()).toEqual(guests);
    });
    it('getAllGuestUsers() will throw not found error if no guest user is present', async () => {
      const userTeam: any = [];
      jest.spyOn(userRoleRepo, 'findOne').mockImplementation(() => userRole);
      jest.spyOn(userTeamRepo, 'find').mockImplementation(() => userTeam);
      try {
        await userService.getAllGuestUsers();
      } catch (e) {
        expect(e.message).toMatch('Guests not found');
      }
    });
  });

  describe('deleteGuestById()', () => {
    it('deleteGuestById() should delete guest user if it is present', async () => {
      const guestId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';
      const user = new User();
      jest.spyOn(userRepo, 'findOne').mockImplementation(() => user);

      expect(await userService.deleteGuestById(guestId)).toBe(undefined);
    });
    it('deleteGuestById() should throw error if user is not present', async () => {
      const guestId = '35afbdf8-9035-4bc6-ae04-28c6140495ad';

      jest.spyOn(userRepo, 'findOne').mockImplementation(() => undefined);
      try {
        await userService.deleteGuestById(guestId);
      } catch (e) {
        expect(e.message).toMatch('User not found');
      }
    });
  });
});
