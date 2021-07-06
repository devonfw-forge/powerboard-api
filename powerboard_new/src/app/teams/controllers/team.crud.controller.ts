import { Body, Controller, Get, Response, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';

import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';

import { Response as eResponse } from 'express';
const fs_1 = require('fs');
const globalPath = `C:/powerboard/multimedia`;
//import { AuthGuard } from '@nestjs/passport';
export const logoStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      // const path = `./uploads/multimedia/${id}/logo`;
      const path = `${globalPath}/${id}/logo`;
      fs_1.mkdirSync(path, { recursive: true });
      return cb(null, path);
    },

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

  @Post('powerboard/team')
  async getPowerboardByTeamId(@Body() userTeam: UserTeamDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.teamService.getPowerboardByTeamId(userTeam);
    res.status(200).json(result);
  }

  @Get('team/:id')
  //@UseGuards(AuthGuard('jwt'))
  async getDashboardByTeamId(@Param('id') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamService.getDashboardByTeamId(teamId);
    res.status(200).json(result);
  }

  @Get('center/:id')
  async getTeamsByCenterId(@Param('id') centerId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.teamService.getTeamsByCenterId(centerId);
    res.status(200).json(result);
  }

  @Post('uploadLogo/:teamId')
  @UseInterceptors(FileInterceptor('file', logoStorage))
  async uploadLogo(
    @UploadedFile() file: Express.Multer.File,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(file);
    const result = await this.teamService.setLogo(file.filename, teamId);
    res.status(201).json(result);
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
