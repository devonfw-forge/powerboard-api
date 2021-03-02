import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { BusinessUnit } from '../model/entities/business-unit.entity';
import { BusinessUnitCrudService } from '../services/business-unit.crud.service';

@Crud({
  model: {
    type: BusinessUnit,
  },
})
@CrudType(BusinessUnit)
@Controller('business-units/business-units')
export class BusinessUnitCrudController {
  constructor(public service: BusinessUnitCrudService) {}
}
