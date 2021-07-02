import { Controller, Get, Param, Body, Put, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../services/team-spirit.crud.service';
//import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
import { TeamDTO } from '../model/dto/TeamDTO';
import { TeamSpiritUserDTO } from '../model/dto/TeamSpiritUserDTO';
import { ChangePasswordTeamSpiritDTO } from '../model/dto/ChangePasswordTeamSpiritDTO';

@Crud({
  model: {
    type: TeamSpirit,
  },
})
@CrudType(TeamSpirit)
@Controller('team-spirit')
export class TeamSpiritCrudController {
  constructor(public teamSpiritService: TeamSpiritCrudService) {}

  @Post('/login')
  async loginToTeamSpirit(@Body() userDTO: TeamSpiritUserDTO): Promise<string> {
    console.log(userDTO.Email + ' ' + userDTO.Password);
    const logincontroller = await this.teamSpiritService.loginToTeamSpirit(userDTO);
    //console.log(logincontroller);
    return logincontroller;
  }

  @Post('/register')
  async registerUser(@Body() userDTO: TeamSpiritUserDTO) {
    return await this.teamSpiritService.registerUser(userDTO);
  }

  @Put('/addUserToTeam/:teamName')
  async addUserToTeam(@Param('teamName') teamName: string, @Body() userDTO: TeamSpiritUserDTO): Promise<any> {
    return await this.teamSpiritService.addUserToTeam(userDTO, teamName);
  }

  @Post('user/create')
  async createUser(@Body() userDto: TeamSpiritUserDTO): Promise<any> {
    return await this.teamSpiritService.createUser(userDto);
  }

  @Put('user/password-change/:userId')
  async updateUser(@Body() newPassword: ChangePasswordTeamSpiritDTO, @Param('userId') userId: number): Promise<any> {
    return await this.teamSpiritService.updateUser(newPassword, userId);
  }

  @Post('team/create')
  async addTeamToTeamSpirit(@Body() team: TeamDTO): Promise<any> {
    return await this.teamSpiritService.addTeamToTeamSpirit(team);
  }

  @Get('/getTeam/:teamName')
  async getTeam(@Param('teamName') teamName: string): Promise<any> {
    return await this.teamSpiritService.getTeam(teamName);
  }

  @Get('/surveyResult/:teamName')
  async getTeamSpiritFromSurvery(@Param('teamName') teamName: string): Promise<any> {
    const teamSpirit = await this.teamSpiritService.getTeamSpiritFromSurvey(teamName);
    return teamSpirit;
  }

  @Put('/updateTeam/:teamName')
  async updateTeamConfiguration(@Body() updatedTeam: TeamDTO, @Param('teamName') teamName: string) {
    console.log(updatedTeam);
    const updatedTeamSpirit = await this.teamSpiritService.updateTeamConfiguration(updatedTeam, teamName);
    return updatedTeamSpirit;
  }

  @Get('/getAllSurveyResult')
  async getAllSurvey(): Promise<any> {
    return await this.teamSpiritService.getAllSurveyResult();
  }

  @Get('/getAllTeams')
  async getAllTeams(): Promise<any> {
    return await this.teamSpiritService.getAllTeams();
  }

  @Get('/getAllUsers')
  async getAllUsers(): Promise<any> {
    return await this.teamSpiritService.getAllUsers();
  }
}
