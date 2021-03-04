import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Burndown } from '../model/entities/burndown.entity';
import { BurndownCrudService } from '../services/burndown.crud.services';


@Crud({
  model: {
    type: Burndown,
  },
})
@CrudType(Burndown)
@Controller('burndown')
export class BurndownCrudController {
  constructor(public service: BurndownCrudService) {}
}