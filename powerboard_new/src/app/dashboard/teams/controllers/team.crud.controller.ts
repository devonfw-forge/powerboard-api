import { Body, Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';
import { LoginResponse } from '../model/dto/LoginResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { TeamResponse } from '../model/dto/TeamResponse';
import { ElectronBoardResponse } from '../model/dto/ElectronBoardResponse';

@Crud({
  model: {
    type: Team,
  },
})
@CrudType(Team)
@Controller('teams')
export class TeamCrudController {
  constructor(public teamService: TeamCrudService) {}

  @Get('user/:id')
  async getDashboardByUserId(
    @Param('id') userId: string,
    @Body() value: any,
  ): Promise<LoginResponse | ElectronBoardResponse> {
    console.log(value.flag);
    if (value.flag) {
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
}
