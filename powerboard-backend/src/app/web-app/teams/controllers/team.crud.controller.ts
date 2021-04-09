import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';
import { LoginResponse} from '../model/dto/LoginResponse';
import { DashBoardResponse } from '../model/dto/DashBoardResponse';
import { TeamResponse } from '../model/dto/TeamResponse';

@Crud({
  model: {
    type: Team,
  },
})
@CrudType(Team)
@Controller('teams')
export class TeamCrudController {
  constructor(public teamService: TeamCrudService) { }

  @Get('user/:id')
  async getDashboardByUserId(@Param('id') userId: number): Promise<LoginResponse> {
    const loginResponse = await this.teamService.getDashboardByUserId(userId);
    return loginResponse;
  }

  @Get('team/:id')
  async getDashboardByTeamId(@Param('id') teamId: number): Promise<DashBoardResponse> {
    const teamResponse = await this.teamService.getDashboardByTeamId(teamId);
    return teamResponse;
  }

  @Get('BU/:id')
  async getTeamsByBUId(@Param('id') BU_Id: number): Promise<TeamResponse[]> {
    return this.teamService.getTeamsByBUId(BU_Id);
  }
}
