import { Controller, Delete, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamLinksCrudService } from '../services/team-links.crud.service';
import { TeamLinks } from '../model/entities/team-links.entity';

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
  async getDailyMeeting(@Param('id') teamId: number): Promise<any> {
    return await this.teamLinksService.getTeamLinks(teamId);
  }

  @Delete('teamLink/delete/:id')
  async deleteTeamLinkById(@Param('id') teamLinkId: number): Promise<any> {
    return await this.teamLinksService.deleteTeamLinkById(teamLinkId);
  }
}
