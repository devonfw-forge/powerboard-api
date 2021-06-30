import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Response } from '@nestjs/common';
import { AddTeam } from '../../../shared/interfaces/addTeam.interface';
import { Response as eResponse } from 'express';
import { AdminService } from '../services/admin.service';
import { UpdateTeam } from '../../../teams/model/dto/updateTeam.interface';
import { UpdateUserRoleDTO } from '../../user/model/dto/UpdateUserRoleDTO';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  //Adding team by System Admin
  // @Post('team/addTeam')
  // async addTeam(@Body() addTeam: AddTeam, @Response() res: eResponse): Promise<void> {
  //   try {
  //     const result = await this.adminService.addTeam(addTeam);
  //     res.status(201).json(result);
  //   } catch (e) {
  //     throw new BadRequestException(e.message);
  //   }
  // }

  @Post('team/addTeam')
  async addTeam(@Body() addTeam: AddTeam, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.addTeam(addTeam);
      res.status(201).json(result);
    } catch (e) {
      // if (!e.status) {
      //   throw new HttpException(this.error_message, HttpStatus.BAD_REQUEST);
      // }
      throw new HttpException(e.message, e.status);
    }
  }

  //Deleting the team , system admin can do it
  @Delete('team/delete/:id')
  async deleteTeamById(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.deleteTeamById(teamId);
      console.log(result);
      res.status(200).json({ message: 'Team successfully Deleted' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //View All Team by system ADMIN
  @Get('team/viewAllTeams')
  async getAllTeams(@Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.getAllTeams();
      res.status(200).json(result);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //Update the team by System ADMIN
  @Put('team/update')
  async updateTeam(@Body() updateTeam: UpdateTeam, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.updateTeam(updateTeam);
      console.log(result);
      res.status(200).json({ message: 'Team successfully updated' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //View All Team member of team by SystemADMIN
  @Get('viewAllMemberOfTeam/:teamId')
  async getAllMemberOfTeam(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.getAllMemberOfTeam(teamId);
      res.status(200).json(result);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //Delete user of particular team
  @Delete('delete/userTeam/:id')
  async deleteUserFromTeamById(@Param('id') userTeamId: string, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.deleteUserFromTeamById(userTeamId);
      console.log(result);
      res.status(200).json({ message: 'User successfully Removed from Team' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //Updating the role of user by system admin
  @Put('update/userRole')
  async updateUserRole(@Body() updateRole: UpdateUserRoleDTO, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.updateUserRole(updateRole);
      res.status(200).json(result);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  //get all the available user roles
  @Get('viewAllUserRoles')
  async getAllUserRoles(@Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.getAllUserRoles();
      res.status(200).json(result);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Get('viewAllGuests')
  async getAllGuestUsers(@Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.getAllGuestUsers();
      res.status(200).json(result);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  @Delete('delete/guest/:id')
  async deleteGuestById(@Param('id') guestId: string, @Response() res: eResponse): Promise<void> {
    try {
      const result = await this.adminService.deleteGuestById(guestId);
      console.log(result);
      res.status(200).json({ status: 'Guest Successfully Deleted' });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
