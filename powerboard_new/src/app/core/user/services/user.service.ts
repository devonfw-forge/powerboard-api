import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
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
var generator = require('generate-password');
@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserTeam) private readonly userTeamRepository: Repository<UserTeam>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
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
  async registerUser(userDTO: UserDTO): Promise<User> {
    const actualUser = await this.findUser(userDTO.username);
    if (actualUser) {
      return this.addUserToOtherTeam(actualUser, userDTO);
    }
    var password = generator.generate({
      length: 6,
      numbers: true,
    });
    console.log(password);
    console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
    const salt = await genSalt(12);
    const hashPass = await hash(password, salt);
    console.log(hashPass);
    let user = new User();
    user.username = userDTO.username;
    user.password = hashPass;
    user.email = userDTO.email;
    const result = await this.userRepository.save(user);

    if (result) {
      let userTeam = new UserTeam();
      userTeam.user = result;
      userTeam.role = (await this.userRoleRepository.findOne({ where: { id: userDTO.role } })) as UserRole;
      userTeam.team = userDTO.team;
      await this.userTeamRepository.save(userTeam);
    }
    return result;
  }

  /**
   * addTeamsToUser method will add user to other teams
   * @param {User, UserDTO} .Takes as input
   * @return {UserTeam} UserTeam as response
   */
  async addUserToOtherTeam(actualUser: User | undefined, userDTO: UserDTO): Promise<any> {
    let userTeam = new UserTeam();
    userTeam.team = userDTO.team;
    userTeam.role = (await this.userRoleRepository.findOne({ where: { id: userDTO.role } })) as UserRole;
    userTeam.user = actualUser!;
    const output = await this.userTeamRepository.save(userTeam);
    return output;
  }

  async addGuest(guest: AddGuestDTO): Promise<User> {
    const actualUser = await this.findUser(guest.username);
    if (actualUser) {
      throw new BadRequestException('user already exists');
    }
    var password = generator.generate({
      length: 6,
      numbers: true,
    });
    console.log(password);
    const salt = await genSalt(12);
    const hashPass = await hash(password, salt);
    let user = new User();
    user.username = guest.username;
    user.password = hashPass;
    user.email = guest.email;
    const result = await this.userRepository.save(user);

    if (result) {
      let userTeam = new UserTeam();
      userTeam.user = result;
      userTeam.role = (await this.userRoleRepository.findOne({ where: { id: guest.role } })) as UserRole;
      const output = await this.userTeamRepository.save(userTeam);
      console.log('Guessst Aa gye');
      console.log(output);
    }
    return result;
  }
  /**
   * deleteUserFromTeamById method will delete user , and system admin can do so
   * @param {userteamId} .Takes userTeamId as input
   * @return {void}
   */
  async deleteUserFromTeamById(id: string): Promise<any> {
    return await this.userTeamRepository.delete(id);
  }

  /**
   * getAllMemberOfTeam method will fetch all user of team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {TeamsMemberResponse[]} .Return array of team member as response
   */
  async getAllMemberOfTeam(teamId: any) {
    const result = (await this.userTeamRepository.find({ where: { team: teamId } })) as UserTeam[];
    let teamsMemberResponse: TeamsMemberResponse = {} as TeamsMemberResponse;
    let teamMemberList = [],
      i;
    for (i = 0; i < result.length; i++) {
      teamsMemberResponse.userTeamId = result[i].id;
      teamsMemberResponse.userName = result[i].user.username;
      teamsMemberResponse.email = result[i].user.email;
      // teamsMemberResponse.accessRole = result[i].accessRole;
      teamMemberList.push(teamsMemberResponse);

      teamsMemberResponse = {} as TeamsMemberResponse;
    }
    return teamMemberList;
  }

  async updateUserRole(updateRoleDTO: UpdateUserRoleDTO): Promise<boolean> {
    let result = (await this.userTeamRepository.findOne({
      where: { user: updateRoleDTO.userId, team: updateRoleDTO.teamId },
    })) as UserTeam;
    let userTeam = new UserTeam();
    let output: boolean;
    if (result) {
      userTeam.id = result.id;
      // userTeam.accessRole = updateRoleDTO.accessRole;
      userTeam.role = (await this.userRoleRepository.findOne({ where: { id: updateRoleDTO.roleId } })) as UserRole;
      const exist = await this.userTeamRepository.save(userTeam);
      if (exist) {
        output = true;
      } else {
        output = false;
      }
    } else {
      console.log('no team found for that user in Userteam');
      output = false;
    }
    return output;
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
      throw new BadRequestException("user team does'nt find");
    }
  }
  async changePassword(changePassword: ChangePasswordDTO): Promise<any> {
    const output = await this.userRepository.findOne({ where: { id: changePassword.userId } });
    const user = new User();
    if (output && (await compare(changePassword.oldPassword, output.password))) {
      user.id = output.id;
      const salt = await genSalt(12);
      const hashPass = await hash(changePassword.newPassword, salt);
      user.password = hashPass;
      user.isPasswordChanged = true;
      return await this.userRepository.save(user);
    } else {
      console.log('User Not found');
      throw new NotFoundException('User not found');
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
}
