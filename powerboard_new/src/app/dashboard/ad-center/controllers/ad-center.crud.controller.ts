import { Controller, Get, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { ADCenter } from '../model/entities/ad-center.entity';
import { ADCenterCrudService } from '../services/ad-center.crud.service';
import { Response as eResponse } from 'express';
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
  //@UseGuards(AuthGuard('jwt'))
  async getAllCenters(@Response() res: eResponse): Promise<void> {
    const result = await this.service.getAllCenters();
    res.status(200).json(result);
  }
}
