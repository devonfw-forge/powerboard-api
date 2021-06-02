import { Controller, Get } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { ADCenter } from '../model/entities/ad-center.entity';
import { ADCenterCrudService } from '../services/ad-center.crud.service';

@Crud({
  model: {
    type: ADCenter,
  },
})
@CrudType(ADCenter)
@Controller('ad-center')
export class ADCenterCrudController {
  constructor(public service: ADCenterCrudService) {}

  //View All Centers
  @Get('viewAllCenters')
  async getAllCenters(): Promise<any> {
    const result = await this.service.getAllCenters();
    console.log(result);
    return result;
  }
}
