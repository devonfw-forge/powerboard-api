import { Injectable } from '@nestjs/common';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { AddTeam } from '../../../shared/interfaces/addTeam.interface';
import { UserService } from '../../user/services/user.service';
//import { TeamSpiritCrudService } from '../../../dashboard/team-spirit-integration/services/team-spirit.crud.service';

import { UserRolesDTO } from '../../user/model/dto/UserRolesDTO';
import { Team } from '../../../teams/model/entities/team.entity';
import { UpdateTeam } from '../../../teams/model/dto/updateTeam.interface';
import { User } from '../../user/model/entities/user.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { TeamsMemberResponse } from '../../../shared/interfaces/teamMemberResponse';
import { UpdateUserRoleDTO } from '../../user/model/dto/UpdateUserRoleDTO';

@Injectable()
export class AdminService {
  constructor(
    private readonly teamService: TeamCrudService,
    private readonly userService: UserService, //private readonly teamSpiritService: TeamSpiritCrudService,
  ) {}

  /**
   * addTeamByAdmin method will add team , and system admin can do so
   * @param {AddTeam} .Takes AddTeam as input
   * @return {Team} Created Team as response
   */
  async addTeam(addTeam: AddTeam): Promise<Team> {
    const result = await this.teamService.addTeam(addTeam);
    return result;
  }

  /**
   * updateTeam method will update exsiting team , and system admin can do so
   * @param {AddTeamDTO} .Takes AddTeamDTO as input
   * @return {Team} Created Team as response
   */
  async updateTeam(updateTeam: UpdateTeam): Promise<Team> {
    return await this.teamService.updateTeam(updateTeam);
  }

  /**
   * getAllTeams method will fetch all team , and system admin can do so
   * @param {} .Takes nothing as input
   * @return {team[]} return team array as response
   */
  getAllTeams() {
    return this.teamService.getAllTeams();
  }

  /**
   * deleteTeamById method will delete team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {void}
   */
  deleteTeamById(teamId: string): any {
    return this.teamService.deleteTeamById(teamId);
  }

  /**
   * updateUserRole method will updateRole of User for particular team , and system admin can do so
   * @param {UpdateRole} .Takes UpdateRole as input
   * @return {boolean} .Return boolean as response
   */
  updateUserRole(updateRole: UpdateUserRoleDTO): Promise<boolean> {
    return this.userService.updateUserRole(updateRole);
  }

  async getAllUserRoles(): Promise<UserRolesDTO[]> {
    return await this.userService.getAllUserRoles();
  }

  /**
   * deleteUserFromTeamById method will delete user from that team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   */
  deleteUserFromTeamById(userTeamId: string): any {
    return this.userService.deleteUserFromTeamById(userTeamId);
  }

  /**
   * getAllMemberOfTeam method will fetch all user of team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {TeamsMemberResponse[]} .Return array of team member as response
   */
  async getAllMemberOfTeam(teamId: string): Promise<TeamsMemberResponse[]> {
    return await this.userService.getAllMemberOfTeam(teamId);
  }

  async getAllGuestUsers(): Promise<User[]> {
    return await this.userService.getAllGuestUsers();
  }

  async deleteGuestById(guestId: string): Promise<DeleteResult> {
    return await this.userService.deleteGuestById(guestId);
  }
}
