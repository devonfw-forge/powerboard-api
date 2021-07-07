import { Controller, Delete, Get, Param, Post, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { FileInterceptor } from '@nestjs/platform-express';
import { CrudType } from '@devon4node/common/serializer';
import { VideosCrudService } from '../services/videos.crud.service';
import { Videos } from '../model/entities/videos.entity';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
// import { join } from 'path';
import { Response as eResponse } from 'express';

const fs_1 = require('fs');
//const globalPath = `C:/powerboard/multimedia`;
export const storage = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const id = req.params.teamId;
      console.log(file);
      console.log(req.params);
      const path = `./uploads/multimedia/${id}/videos`;
      //const path = `${globalPath}/${id}/videos`;
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
    type: Videos,
  },
})
@CrudType(Videos)
@Controller('videos')
export class VideosCrudController {
  constructor(public videoService: VideosCrudService) {}

  @Post('uploadVideo/:teamId')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadVideo(
    @UploadedFile() file: Express.Multer.File,
    @Param('teamId') teamId: string,
    @Response() res: eResponse,
  ): Promise<void> {
    console.log(file);
    const result = await this.videoService.setVideoPath(file.filename, teamId);
    res.status(201).json(result);
  }

  @Get('getAllVideos/:teamId')
  async getAllVideos(@Param('teamId') teamId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.videoService.getVideosForTeam(teamId);
    res.status(200).json(result);
  }

  @Delete('delete/:id')
  async deleteVideoById(@Param('id') videoId: string, @Response() res: eResponse): Promise<void> {
    const result = await this.videoService.deleteVideoById(videoId);
    console.log(result);
    res.status(200).json({ message: 'Video successfully Deleted' });
  }
  // @Get('videoname/:videoname')
  // async findProfileVideo(@Param('videoname') videoname: any, @Res() res: any): Promise<Object> {
  //   return res.sendFile(join(process.cwd(), 'uploads/videos/' + videoname));
  // }

  // @Post('multiple')
  // @UseInterceptors(FilesInterceptor('file', 20, storage))
  // async uploadMultipleFiles(@UploadedFiles() files: any) {
  //   const response: any = [];
  //   files.forEach((file: any) => {
  //     const fileReponse = {
  //       imagePath: file.path,

  //     };
  //     response.push(fileReponse);
  //   });
  //   return response;
  // }

  // @Get(':vidpath')
  // seeUploadedFile(@Param('vidpath') video: any, @Res() res: any) {
  //   return res.sendFile(video, { root: './uploads/videos/' });
  // }
}
