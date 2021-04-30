import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamLinksCrudService } from '../services/team-links.crud.service';
import { TeamLinks } from '../model/entities/team-links.entity';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: {
    type: TeamLinks,
  },
})
@CrudType(TeamLinks)
@Controller('team-links')
export class TeamLinksCrudController {
  constructor(public teamLinksService: TeamLinksCrudService) {}

  @Get('teamId/:id')
  async getDailyMeeting(@Param('id') teamId: string): Promise<any> {
    return await this.teamLinksService.getTeamLinks(teamId);
  }

  @Delete('delete/:id')
  async deleteTeamLinkById(@Param('id') teamLinkId: string): Promise<any> {
    return await this.teamLinksService.deleteTeamLinkById(teamLinkId);
  }

  @Post('teamId/create')
  @UseGuards(AuthGuard('jwt'))
  async createDailyMeeting(@Body() teamLinkDTO: TeamLinkDTO): Promise<any> {
    return await this.teamLinksService.createTeamLinks(teamLinkDTO);
  }
}
