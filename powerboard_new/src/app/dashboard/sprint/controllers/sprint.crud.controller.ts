import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Sprint } from '../model/entities/sprint.entity';
import { SprintCrudService } from '../services/sprint.crud.service';
import { BurndownResponse } from '../model/dto/BurndownResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';

@Crud({
  model: {
    type: Sprint,
  },
})
@CrudType(Sprint)
@Controller('sprint')
export class SprintCrudController {
  constructor(public service: SprintCrudService) {}
  @Get('burndown/demo/:id')
  async getBurndown(@Param('id') teamId: string): Promise<BurndownResponse | undefined> {
    return await this.service.getBurndown(teamId);
  }

  @Get('velocity/demo/:id')
  async getVelocityComparison(@Param('id') teamId: string): Promise<VelocityComparisonResponse> {
    return await this.service.getVelocityComparison(teamId);
  }
}
