import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from '../services/images.crud.service';

@Crud({
  model: {
    type: Images,
  },
})
@CrudType(Images)
@Controller('images')
export class ImagesCrudController {
  constructor(public service: ImagesCrudService) {}
}
