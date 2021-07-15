import { Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors, Response } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from '../services/images.crud.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Response as eResponse } from 'express';

const fs_1 = require('fs');
// const globalPath = `C:/powerboard/multimedia`;
export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      const path = `./uploads/multimedia/${id}/images`;
      //const path = `../../../../../../../../../../uploads/multimedia/${id}/images`;

      // const path = `${globalPath}/${id}/images`;
      fs_1.mkdirSync(path, { recursive: true });
      return cb(null, path);
    },

    filename: (req, file, cb) => {
      console.log(req);
      const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
};

// export const logoStorage = {
//   storage: diskStorage({
//     destination: (req, file, cb) => {
//       const id = req.params.teamId;
//       console.log(file);
//       console.log(req.params);
//       const path = `./uploads/multimedia/${id}/logo`;
//       fs_1.mkdirSync(path, { recursive: true });
//       return cb(null, path);
//     },

//     filename: (req, file, cb) => {
//       console.log(req);
//       const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
//       const extension: string = path.parse(file.originalname).ext;
//       cb(null, `${filename}${extension}`);
//     },
//   }),
// };
@Crud({
  model: {
    type: Images,
  },
})
@CrudType(Images)
@Controller('images')
export class ImagesCrudController {
  constructor(public imageService: ImagesCrudService) {}

  @Post('uploadImage/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(file);

    const result = await this.imageService.setImagePath(file.filename, teamId);
    res.status(201).json(result);
  }

  // @Get('imagename/:imagename')
  // async findProfileImage(@Param('imagename') imagename: any, @Res() res: any): Promise<Object> {
  //   return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename));
  // }
  @Get('getAllImages/:teamId')
  //@UseGuards(AuthGuard('jwt'))
  async getAllImages(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.imageService.getImagesForTeam(teamId);
    res.status(200).json(result);
  }

  @Delete('delete/:id')
  //@UseGuards(AuthGuard('jwt'))
  async deleteImageById(@Param('id') imageId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.imageService.deleteImageById(imageId);
    console.log(result);
    res.status(200).json({ message: 'Image successfully Deleted' });
  }
}
