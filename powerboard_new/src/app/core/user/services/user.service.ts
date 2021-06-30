import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserDTO } from '../model/dto/UserDTO';
import { TeamsMemberResponse } from '../../../shared/interfaces/teamMemberResponse';
import { ChangePasswordDTO } from '../../auth/model/ChangePasswordDTO';
import { UserRole } from '../model/entities/user_role.entity';
import { AddGuestDTO } from '../model/dto/AddGuestDTO';
import { UpdateUserRoleDTO } from '../model/dto/UpdateUserRoleDTO';
import { UserRolesDTO } from '../model/dto/UserRolesDTO';
import { TeamSpiritCrudService } from '../../../dashboard/team-spirit-integration/services/team-spirit.crud.service';
import { TeamSpiritUserDTO } from '../../../dashboard/team-spirit-integration/model/dto/TeamSpiritUserDTO';
import { UserInfo } from '../model/entities/user_info.entity';

var generator = require('generate-password');
@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserTeam) private readonly userTeamRepository: Repository<UserTeam>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(UserInfo) private readonly userInfoRepository: Repository<UserInfo>,
    private readonly teamSpiritService: TeamSpiritCrudService,
  ) {
    super(userRepository);
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * registerUser method will register the user as well as add user to other team also
   * @param {UserDTO} .Takes as input
   * @return {User} created User as response
   */
  async registerUser(userDTO: UserDTO): Promise<any> {
    const actualUser = await this.findUser(userDTO.username);
    if (actualUser) {
      console.log(actualUser);
      return this.addUserToOtherTeam(actualUser, userDTO);
    }
    var password = generator.generate({ length: 6, numbers: true });
    console.log(password);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    const salt = await genSalt(12);
    const hashPass = await hash(password, salt);
    let user = new User();
    user.username = userDTO.username;
    user.password = hashPass;
    user.email = userDTO.email;
    const result = await this.userRepository.save(user);
    if (result) {
      return this.addUserToOtherTeam(result, userDTO);
    }
  }

  /**
   * addTeamsToUser method will add user to other teams
   * @param {User, UserDTO} .Takes as input
   * @return {UserTeam} UserTeam as response
   */
  async addUserToOtherTeam(actualUser: User, userDTO: UserDTO): Promise<any> {
    let userTeam = new UserTeam();
    userTeam.user = actualUser;
    const roleObj = (await this.userRoleRepository.findOne({ where: { id: userDTO.role } })) as UserRole;

    const output = (await this.userTeamRepository.findOne({
      where: { user: actualUser.id, team: userDTO.team.id },
    })) as UserTeam;
    if (output) {
      throw new Error('User in team already exists');
    }
    if (roleObj.roleName == 'team_admin') {
      let teamSpiritUserDTO1 = {} as TeamSpiritUserDTO;
      teamSpiritUserDTO1.Email = 'adminTeamSpirit@capgemini.com';
      teamSpiritUserDTO1.Password = 'TeamSpiritAdmin!';
      const token = await this.teamSpiritService.loginToTeamSpirit(teamSpiritUserDTO1);
      console.log(token);
      console.log('------------------------');
      if (token) {
        let teamSpiritUserDTO = new TeamSpiritUserDTO();
        teamSpiritUserDTO.Email = userDTO.email;
        teamSpiritUserDTO.Full_Name = userDTO.fullName;
        teamSpiritUserDTO.Password = actualUser.password;
        console.log(teamSpiritUserDTO);
        const result = await this.teamSpiritService.addUserToTeam(teamSpiritUserDTO, userDTO.team.name);
        console.log(result);
        console.log('((((((((((((((((((((((((((((((((');
      }
    }
    userTeam.role = roleObj;
    userTeam.team = userDTO.team;
    return await this.userTeamRepository.save(userTeam);
  }

  async addGuest(guest: AddGuestDTO): Promise<User> {
    const guestRoleOBJ = (await this.userRoleRepository.findOne({ where: { roleName: 'guest_user' } })) as UserRole;

    if (guest.role != guestRoleOBJ.id) {
      throw new BadRequestException('User is not guest, Try diffrent method to register diffrent users');
    }

    const actualUser = await this.findUser(guest.username);
    if (actualUser) {
      throw new BadRequestException('user already registered');
    }

    var password = generator.generate({
      length: 6,
      numbers: true,
    });

    console.log('Password ->>>>>>>>>' + password);
    const salt = await genSalt(12);
    const hashPass = await hash(password, salt);
    let user = new User();
    user.username = guest.username;
    user.password = hashPass;
    user.email = guest.email;
    try {
      let result = await this.userRepository.save(user);

      if (result) {
        let userTeam = new UserTeam();
        userTeam.user = result;
        userTeam.role = guestRoleOBJ;
        const output = await this.userTeamRepository.save(userTeam);
        console.log(output);
      }
      return result;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  /**
   * deleteUserFromTeamById method will delete user , and system admin can do so
   * @param {userteamId} .Takes userTeamId as input
   * @return {void}
   */
  async deleteUserFromTeamById(id: string): Promise<DeleteResult> {
    const userTeam = (await this.userTeamRepository.findOne({ where: { id: id } })) as UserTeam;
    if (!userTeam) {
      throw new NotFoundException('user not found for that tam');
    } else {
      return await this.userTeamRepository.delete(id);
    }
  }

  /**
   * getAllMemberOfTeam method will fetch all user of team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {TeamsMemberResponse[]} .Return array of team member as response
   */
  async getAllMemberOfTeam(teamId: string): Promise<TeamsMemberResponse[]> {
    const result = (await this.userTeamRepository.find({ where: { team: teamId } })) as UserTeam[];
    if (result.length == 0) {
      throw new NotFoundException('No Member Found in team');
    }
    let teamsMemberResponse: TeamsMemberResponse = {} as TeamsMemberResponse;
    let teamMemberList = [],
      i;
    for (i = 0; i < result.length; i++) {
      teamsMemberResponse.userTeamId = result[i].id;
      teamsMemberResponse.userId = result[i].user.id;
      teamsMemberResponse.teamId = result[i].team.id;
      teamsMemberResponse.roleId = result[i].role.id;
      teamsMemberResponse.userName = result[i].user.username;
      teamsMemberResponse.email = result[i].user.email;
      teamMemberList.push(teamsMemberResponse);

      teamsMemberResponse = {} as TeamsMemberResponse;
    }
    return teamMemberList;
  }

  async updateUserRole(updateRoleDTO: UpdateUserRoleDTO): Promise<UserTeam> {
    let userTeam = (await this.userTeamRepository.findOne({
      where: { user: updateRoleDTO.userId, team: updateRoleDTO.teamId },
    })) as UserTeam;

    if (!userTeam) {
      throw new ConflictException('User in team not found');
    }
    let userTeamOBJ = new UserTeam();
    userTeamOBJ.id = userTeam.id;
    userTeamOBJ.role = (await this.userRoleRepository.findOne({ where: { id: updateRoleDTO.roleId } })) as UserRole;
    const result = await this.userTeamRepository.save(userTeamOBJ);
    return result;
  }

  findUserTeamsByUserId(id: string) {
    return this.userTeamRepository.find({ where: { user: id } });
  }

  async getTeamPrivileges(userId: string, teamId: string, isAdminOrGuest: boolean): Promise<any> {
    if (isAdminOrGuest) {
      console.log('guest ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
      return this.getAllPrivileges(userId);
    } else {
      const output = (await this.userTeamRepository.findOne({ where: { user: userId, team: teamId } })) as UserTeam;
      let privilegeArray: string[] = [],
        i;
      if (output) {
        return this.getPrivilegesList(output);
      } else {
        const output = (await this.userRoleRepository.findOne({ where: { roleName: 'guest_user' } })) as UserRole;
        for (i = 0; i < output?.privilege.length; i++) {
          privilegeArray.push(output.privilege[i].privilegeName);
        }
        return privilegeArray;
      }
    }
    // }
  }

  getPrivilegesList(userTeam: UserTeam) {
    let privilegeArray: string[] = [],
      i;
    for (i = 0; i < userTeam?.role.privilege.length; i++) {
      privilegeArray.push(userTeam?.role.privilege[i].privilegeName);
    }

    return privilegeArray;
  }

  async getAllPrivileges(userId: string): Promise<string[]> {
    const userTeam = (await this.userTeamRepository.findOne({ where: { user: userId } })) as UserTeam;
    if (userTeam) {
      return this.getPrivilegesList(userTeam);
    } else {
      throw new NotFoundException('privileges not found');
    }
  }
  async userInfoDetail(userId: string): Promise<any> {
    return (await this.userInfoRepository.findOne({ where: { userId: userId } })) as UserInfo;
  }
  async changePassword(changePassword: ChangePasswordDTO): Promise<any> {
    const output = await this.userRepository.findOne({ where: { id: changePassword.userId } });
    const user = new User();
    if (output && (await compare(changePassword.oldPassword, output.password))) {
      user.id = output.id;
      const salt = await genSalt(12);
      const hashPass = await hash(changePassword.newPassword, salt);
      user.password = hashPass;
      //user.isPasswordChanged = true;
      const result = await this.userRepository.save(user);
      if (result) {
        let userInfo = new UserInfo();
        userInfo.userId = output.id;
        await this.userInfoRepository.save(userInfo);
      } else {
        console.log('User Not found');
        throw new NotFoundException('User not found');
      }
      return result;
    }
  }

  async isAdminOrGuest(userId: string): Promise<boolean> {
    const output = (await this.userTeamRepository.findOne({ where: { user: userId } })) as UserTeam;
    if (output.role.roleName == 'system_admin' || output.role.roleName == 'guest_user') {
      return true;
    }
    return false;
  }

  async getAllUserRoles(): Promise<UserRolesDTO[]> {
    const roles = await this.userRoleRepository.find();
    if (!roles) {
      throw new NotFoundException('No Roles Found');
    }
    let rolesList = [],
      i;
    for (i = 0; i < roles!.length; i++) {
      let userRole: UserRolesDTO = {} as UserRolesDTO;
      userRole.roleId = roles[i]!.id;
      userRole.roleName = roles[i]!.roleName;
      rolesList.push(userRole);
    }
    return rolesList;
  }

  async getAllGuestUsers(): Promise<User[]> {
    let guests: User[] = [];
    const guestRoleOBJ = (await this.userRoleRepository.findOne({ where: { roleName: 'guest_user' } })) as UserRole;
    const userTeams = (await this.userTeamRepository.find({ where: { role: guestRoleOBJ.id } })) as UserTeam[];

    if (userTeams.length == 0) {
      throw new NotFoundException('Guests not found');
    }

    for (let i = 0; i < userTeams.length; i++) {
      guests[i] = userTeams[i].user;
    }
    return guests;
  }

  async deleteGuestById(guestId: string): Promise<DeleteResult> {
    const user = (await this.userRepository.findOne({ where: { id: guestId } })) as User;
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.delete(guestId);
  }
}
