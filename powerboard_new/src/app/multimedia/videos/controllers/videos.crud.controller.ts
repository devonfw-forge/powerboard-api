import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { VideosCrudService } from '../services/videos.crud.service';
import { Videos } from '../model/entities/videos.entity';

@Crud({
  model: {
    type: Videos,
  },
})
@CrudType(Videos)
@Controller('videos')
export class VideosCrudController {
  constructor(public service: VideosCrudService) {}
}
