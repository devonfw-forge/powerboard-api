import { Body, Controller, Delete, Get, Param, Post, Put, Response } from '@nestjs/common';
import { AddTeam } from '../../../shared/interfaces/addTeam.interface';
import { Response as eResponse } from 'express';
import { AdminService } from '../services/admin.service';
import { UpdateTeam } from '../../../teams/model/dto/updateTeam.interface';
import { UpdateUserRoleDTO } from '../../user/model/dto/UpdateUserRoleDTO';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  //Adding team by System Admin
  @Post('team/addTeam')
  //@UseGuards(AuthGuard('jwt'))
  async addTeam(@Body() addTeam: AddTeam, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.addTeam(addTeam);
    res.status(201).json(result);
  }

  //Deleting the team , system admin can do it
  @Delete('team/delete/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteTeamById(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.deleteTeamById(teamId);
    console.log(result);
    res.status(200).json({ message: 'Team successfully Deleted' });
  }

  //View All Team by system ADMIN
  @Get('team/viewAllTeams')
  //@UseGuards(AuthGuard('jwt'))
  async getAllTeams(@Response() res: eResponse): Promise<void> {
    const result = await this.adminService.getAllTeams();
    res.status(200).json(result);
  }

  //Update the team by System ADMIN
  @Put('team/update')
  //@UseGuards(AuthGuard('jwt'))
  async updateTeam(@Body() updateTeam: UpdateTeam, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.updateTeam(updateTeam);
    console.log(result);
    res.status(200).json(result);
  }

  //View All Team member of team by SystemADMIN
  @Get('viewAllMemberOfTeam/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllMemberOfTeam(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.getAllMemberOfTeam(teamId);
    res.status(200).json(result);
  }

  //Delete user of particular team
  @Delete('delete/userTeam/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteUserFromTeamById(@Param('id') userTeamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.deleteUserFromTeamById(userTeamId);
    console.log(result);
    res.status(200).json({ message: 'User successfully Removed from Team' });
  }

  //Updating the role of user by system admin
  @Put('update/userRole')
  //@UseGuards(AuthGuard('jwt'))
  async updateUserRole(@Body() updateRole: UpdateUserRoleDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.updateUserRole(updateRole);
    res.status(200).json(result);
  }

  //get all the available user roles
  @Get('viewAllUserRoles')
  //@UseGuards(AuthGuard('jwt'))
  async getAllUserRoles(@Response() res: eResponse): Promise<void> {
    const result = await this.adminService.getAllUserRoles();
    res.status(200).json(result);
  }

  @Get('viewAllGuests')
  //@UseGuards(AuthGuard('jwt'))
  async getAllGuestUsers(@Response() res: eResponse): Promise<void> {
    const result = await this.adminService.getAllGuestUsers();
    res.status(200).json(result);
  }

  @Delete('delete/guest/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteGuestById(@Param('id') guestId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.adminService.deleteGuestById(guestId);
    console.log(result);
    res.status(200).json({ status: 'Guest Successfully Deleted' });
  }
}
