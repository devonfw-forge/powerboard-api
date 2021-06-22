import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Response,
  BadRequestException,
} from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudType } from '@devon4node/common/serializer';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from '../services/images.crud.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { ImageResponse } from '../model/dto/ImageResponse';
import { Response as eResponse } from 'express';
// import { join } from 'path';
const fs_1 = require('fs');
export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      const path = `./uploads/multimedia/${id}/images`;
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

export const logoStorage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      const path = `./uploads/multimedia/${id}/logo`;
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
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(file);
    const result = await this.imageService.setImagePath(file.filename, teamId);
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('Your request cannot be processed, Sorry for inconvenience');
    }
  }

  @Post('uploadLogo/:teamId')
  @UseInterceptors(FileInterceptor('file', logoStorage))
  async uploadLogo(
    @UploadedFile() file: Express.Multer.File,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(file);
    const result = await this.imageService.setLogoPath(file.filename, teamId);
    if (result) {
      res.status(201).send();
    } else {
      throw new BadRequestException('Your request cannot be processed, Sorry for inconvenience');
    }
  }
  // @Get('imagename/:imagename')
  // async findProfileImage(@Param('imagename') imagename: any, @Res() res: any): Promise<Object> {
  //   return res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename));
  // }
  @Get('getAllImages/:teamId')
  async getAllImages(@Param('teamId') teamId: string): Promise<ImageResponse[]> {
    return await this.imageService.getImagesForTeam(teamId);
  }

  @Delete('delete/:id')
  async deleteImageById(@Param('id') imageId: string): Promise<any> {
    return await this.imageService.deleteImageById(imageId);
  }
  // @Post('multiple')
  // @UseInterceptors(FilesInterceptor('file', 20, storage))
  // async uploadMultipleFiles(@UploadedFiles() files: any) {
  //   const response: any = [];
  //   files.forEach((file: any) => {
  //     const fileReponse = {
  //       imagePath: file.path,
  //       // originalname: file.originalname,
  //       // filename: file.filename,
  //     };
  //     response.push(fileReponse);
  //   });
  //   return response;
  // }

  // @Get(':imgpath')
  // seeUploadedFile(@Param('imgpath') image: any, @Res() res: any) {
  //   return res.sendFile(image, { root: './uploads/profileimages/' });
  // }
}
