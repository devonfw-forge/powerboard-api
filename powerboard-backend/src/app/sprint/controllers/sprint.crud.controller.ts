import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Sprint } from '../model/entities/sprint.entity';
import { SprintCrudService } from '../services/sprint.crud.service';

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
  async getBurndown(@Param('id') teamId: number): Promise<any> {
    return await this.service.getBurndown(teamId);
  }

  @Get('velocity/demo/:id')
  async getVelocityComparison(@Param('id') teamId: number): Promise<any> {
    return await this.service.getVelocityComparison(teamId);
  }
}
