import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Team } from '../model/entities/team.entity';
import { TeamCrudService } from '../services/team.crud.service';

@Crud({
  model: {
    type: Team,
  },
})
@CrudType(Team)
@Controller('teams/user')
export class TeamCrudController {
  constructor(public teamService: TeamCrudService) {}

  @Get('breadcrumb/:id')
  async getDashboardByUserId(@Param('id') id :number):Promise<any>{
    const response =  await this.teamService.getDashboardByUserId(id);
    return response;
   }

}
