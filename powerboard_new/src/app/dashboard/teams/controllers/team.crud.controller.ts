import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';
import { LoginResponse } from '../model/dto/LoginResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
import { ElectronBoardResponse } from '../model/dto/ElectronBoardResponse';
import { diskStorage } from 'multer';
import path = require('path');
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Get('user/:id/:flag')
  async getDashboardByUserId(
    @Param('id') userId: string,
    @Param('flag') flag: boolean,
  ): Promise<LoginResponse | ElectronBoardResponse> {
    if (flag) {
      const loginResponse = await this.teamService.getDashboardByUserId(userId);
      return loginResponse;
    } else {
      const electronResponse = await this.teamService.getElectronBoardByUserId(userId);
      return electronResponse;
    }
  }

  @Get('team/:id')
  async getDashboardByTeamId(@Param('id') teamId: string): Promise<DashBoardResponse> {
    const teamResponse = await this.teamService.getDashboardByTeamId(teamId);
    return teamResponse;
  }

  @Get('BU/:id')
  async getTeamsByBUId(@Param('id') BU_Id: string): Promise<TeamResponse[]> {
    return this.teamService.getTeamsByBUId(BU_Id);
  }

  @Post('uploadLogo/:teamId')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Param('teamId') teamId: string): Promise<Object> {
    console.log(file);
    const result = this.teamService.setLogoPath(file.path, teamId);
    return result;
  }
}
