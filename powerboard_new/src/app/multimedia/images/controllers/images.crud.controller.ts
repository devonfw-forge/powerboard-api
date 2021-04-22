import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from '../services/images.crud.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      console.log(req);
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

@Crud({
  model: {
    type: Images,
  },
})
@CrudType(Images)
@Controller('images')
export class ImagesCrudController {
  constructor(public service: ImagesCrudService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<Object> {
    console.log(file);
    return { imagePath: file.path };
  }

  @Get('image/:imagename')
  async findProfileImage(@Param('imagename') imagename: any, @Res() res: any): Promise<Object> {
    return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename));
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('file', 20, storage))
  async uploadMultipleFiles(@UploadedFiles() files: any) {
    const response: any = [];
    files.forEach((file: any) => {
      const fileReponse = {
        imagePath: file.path,
        // originalname: file.originalname,
        // filename: file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image: any, @Res() res: any) {
    return res.sendFile(image, { root: './uploads/profileimages/' });
  }
}
