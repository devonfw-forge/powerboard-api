import { Controller, Get, Param, Body, Put, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../services/team-spirit.crud.service';
//import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
import { TeamDTO } from '../model/dto/TeamDTO';
import { TeamSpiritUserDTO } from '../model/dto/TeamSpiritUserDTO';

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

  @Post('/addUserToTeam')
  async addUserToTeam(@Body() userDTO: TeamSpiritUserDTO, teamName: string): Promise<any> {
    return await this.teamSpiritService.addUserToTeam(userDTO, teamName);
  }

  @Post('/create')
  async addTeamToTeamSpirit(@Body() team: TeamDTO): Promise<any> {
    return await this.teamSpiritService.addTeamToTeamSpirit(team);
  }

  @Get('/getTeam/:teamName')
  async getTeam(@Param('teamName') teamName: string): Promise<any> {
    return await this.teamSpiritService.getTeam(teamName);
  }

  @Get('/surveyResult/:projectName')
  async getTeamSpiritFromSurvery(@Param('projectName') projectName: string): Promise<any> {
    const teamSpirit = await this.teamSpiritService.getTeamSpiritFromSurvey(projectName);
    return teamSpirit;
  }

  @Put('/updateTeam/:projectName')
  async updateTeamSpiritConfiguration(@Body() newGroup: TeamDTO, @Param('projectName') projectName: string) {
    const updatedTeamSpirit = await this.teamSpiritService.updateTeamSpiritConfiguration(newGroup, projectName);
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
}
