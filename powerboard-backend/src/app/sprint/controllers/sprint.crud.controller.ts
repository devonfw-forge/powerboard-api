import { Controller } from '@nestjs/common';
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
@Controller('sprint/sprints')
export class SprintCrudController {
  constructor(public service: SprintCrudService) {}
}
