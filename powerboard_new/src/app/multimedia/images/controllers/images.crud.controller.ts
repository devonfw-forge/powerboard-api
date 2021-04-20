import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from '../services/images.crud.service';

// export const storage = {
//   storage: diskStorage({
//       destination: './uploads/profileimages',
//       filename: (req, file, cb) => {
//           const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//           const extension: string = path.parse(file.originalname).ext;

//           cb(null, `${filename}${extension}`)
//       }
//   })

// }

@Crud({
  model: {
    type: Images,
  },
})
@CrudType(Images)
@Controller('images')
export class ImagesCrudController {
  constructor(public service: ImagesCrudService) {}

  //   @Post('upload')
  //     @UseInterceptors(FileInterceptor('file', storage))
  //     uploadFile(@UploadedFile() file): Promise<Object> {

  //         )
  //     }
}
