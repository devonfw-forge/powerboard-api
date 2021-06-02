import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
//import { AddTeamDTO } from '../model/dto/AddTeamDTO';
//import { AuthGuard } from '@nestjs/passport';
export const storage = {
  storage: diskStorage({
    destination: './uploads/logo',
    filename: (req, file, cb) => {
      console.log(req);
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};
@Crud({
  model: {
    type: Team,
  },
})
@CrudType(Team)
@Controller('teams')
export class TeamCrudController {
  constructor(public teamService: TeamCrudService) {}

  //Return whole detail of team as LoginResponse (including dashboard+ electronboard)
  // @Get('powerboard/team/:teamId')
  // async getPowerboardByTeamId(@Param('teamId') teamId: string): Promise<any> {
  //   const powerboardResponse = await this.teamService.getPowerboardByTeamId(teamId);
  //   return { powerboardResponse };
  // }
  @Post('powerboard/team')
  async getPowerboardByTeamId(@Body() userTeam: UserTeamDTO): Promise<any> {
    const powerboardResponse = await this.teamService.getPowerboardByTeamId(userTeam);
    return { powerboardResponse };
  }

  @Get('team/:id')
  //@UseGuards(AuthGuard('jwt'))
  async getDashboardByTeamId(@Param('id') teamId: string): Promise<DashBoardResponse> {
    const teamResponse = await this.teamService.getDashboardByTeamId(teamId);
    return teamResponse;
  }

  @Get('center/:id')
  async getTeamsByCenterId(@Param('id') centerId: string): Promise<TeamResponse[]> {
    return this.teamService.getTeamsByCenterId(centerId);
  }

  @Post('uploadLogo/:teamId')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('teamId') teamId: string): Promise<Object> {
    console.log(file);
    const result = this.teamService.setLogoPath(file.path, teamId);
    return result;
  }

  // //Adding more team to powerboard application by system admin
  // @Post('team/addTeam')
  // async addTeam(@Body() addTeam: AddTeamDTO):Promise<any>{
  //   await this.teamService.addTeam(addTeam);

  // }

  // //Deleting the team , system admin can do it //pendinf
  // @Delete('team/delete/:id')
  // async deleteTeamById(@Param('id') teamId: string): Promise<any> {
  //   return await this.teamService.deleteTeamById(teamId);
  // }

  // //View All Team
  // @Get('viewAllTeams')
  // async getAllTeams():Promise<any>{
  //   const result = await this.teamService.getAllTeams();
  //   console.log(result)
  //   return result;
  // }

  // //Update the team
  // @Put('team/update')
  // async updateTheteam(@Body() updateTeam:AddTeamDTO):Promise<any>
  // {
  //     return await this.teamService.updateTeam(updateTeam);
  // }
}
