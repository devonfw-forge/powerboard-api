import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../services/team-spirit.crud.service';

@Crud({
  model: {
    type: TeamSpirit,
  },
})
@CrudType(TeamSpirit)
@Controller('team-spirit')
export class TeamSpiritCrudController {
  constructor(public teamSpiritService: TeamSpiritCrudService) {}

  @Get('/:projectName')
 // @UseGuards(AuthGuard('jwt'))
  async getTeamSpiritFromProjectName( @Param('projectName') projectName:string) {
    const teamSpiritO = await this.teamSpiritService.getTeamSpiritFromProjectName(
      projectName,
    );
     return teamSpiritO;
  }

}
