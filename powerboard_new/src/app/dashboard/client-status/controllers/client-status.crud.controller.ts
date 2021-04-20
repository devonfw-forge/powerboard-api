import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { ClientStatus } from '../model/entities/client-status.entity';
import { ClientStatusCrudService } from '../services/client-status.crud.service';

@Crud({
  model: {
    type: ClientStatus,
  },
})
@CrudType(ClientStatus)
@Controller('client-status/client-statuses')
export class ClientStatusCrudController {
  constructor(public service: ClientStatusCrudService) {}
}
