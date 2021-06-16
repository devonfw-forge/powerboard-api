import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { AddTeam } from '../../../shared/interfaces/addTeam.interface';
import { UserRolesDTO } from '../../user/model/dto/UserRolesDTO';
import { Response as eResponse } from 'express';
import { AdminService } from '../services/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  //Adding team by System Admin
  @Post('team/addTeam')
  async addTeam(@Body() addTeam: AddTeam): Promise<any> {
    await this.adminService.addTeamByAdmin(addTeam);
  }

  //Deleting the team , system admin can do it
  @Delete('team/delete/:id')
  async deleteTeamById(@Param('id') teamId: string): Promise<any> {
    return await this.adminService.deleteTeamById(teamId);
  }

  //View All Team by system ADMIN
  @Get('team/viewAllTeams')
  async getAllTeams(): Promise<any> {
    const result = await this.adminService.getAllTeams();
    console.log(result);
    return result;
  }

  //Update the team by System ADMIN
  @Put('team/update')
  async updateTheteam(@Body() updateTeam: AddTeam): Promise<any> {
    return await this.adminService.updateTeam(updateTeam);
  }

  //View All Team member of team by SystemADMIN
  @Get('viewAllMemberOfTeam/:teamId')
  async getAllMemberOfTeam(@Param('teamId') teamId: string): Promise<any> {
    const result = await this.adminService.getAllMemberOfTeam(teamId);
    console.log(result);
    return result;
  }

  //Delete user of particular team
  @Delete('delete/userTeam/:id')
  async deleteUserFromTeamById(@Param('id') userTeamId: string): Promise<any> {
    return await this.adminService.deleteUserFromTeamById(userTeamId);
  }

  //Updating the role of user by system admin
  @Put('update/userRole')
  async updateUserRole(@Body() updateRole: any, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.updateUserRole(updateRole);
    if (result) {
      res.status(200).send();
    } else {
      throw new BadRequestException('UserId & TeamId combination not found');
    }
  }

  //get all the available user roles
  @Get('viewAllUserRoles')
  async getAllUserRoles(): Promise<UserRolesDTO[]> {
    return await this.adminService.getAllUserRoles();
  }
}
