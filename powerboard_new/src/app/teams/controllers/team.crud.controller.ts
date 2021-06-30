import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Response,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserTeamDTO } from '../model/dto/UserTeamDTO';
import { TeamsInADC } from '../model/dto/TeamsInADC';
import { Response as eResponse } from 'express';
const fs_1 = require('fs');
//import { AuthGuard } from '@nestjs/passport';
export const logoStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      const path = `./uploads/multimedia/${id}/logo`;
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
  async getTeamsByCenterId(@Param('id') centerId: string): Promise<TeamsInADC[]> {
    return this.teamService.getTeamsByCenterId(centerId);
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
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('Your request cannot be processed, Sorry for inconvenience');
    }
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
