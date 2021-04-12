import { Controller } from '@nestjs/common';
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
@Controller('team-spirit/team-spirits')
export class TeamSpiritCrudController {
  constructor(public service: TeamSpiritCrudService) {}
}
