import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { VideoResponse } from '../model/dto/VideoResponse';
import { Videos } from '../model/entities/videos.entity';

@Injectable()
export class VideosCrudService extends TypeOrmCrudService<Videos> {
  constructor(@InjectRepository(Videos) private readonly videoRepository: Repository<Videos>) {
    super(videoRepository);
  }
  videoResponse: VideoResponse = {} as VideoResponse;

  /**
   * setVideoPath method will save all videos for that team
   * @param {teamId, videoPath} .Takes teamId and videoPath as input
   * @return {Videos} Videos as response for that team
   */
  async setVideoPath(path: string, teamId: number): Promise<Videos> {
    let videos = new Videos();
    videos.content = path;
    videos.team = teamId;
    return await this.videoRepository.save(videos);
  }

  /**
   * getPathOfVideos method will fetch all videos for that team
   * @param {teamId} .Takes teamId as input
   * @return {VideoResponse[]} VideoResponse[] as response for that team
   */
  async getPathOfVideos(teamId: number): Promise<VideoResponse[]> {
    const result = await this.videoRepository.find({ where: { team: teamId } });
    let i = 0;
    let videoResponseArray = [];
    for (i = 0; i < result.length; i++) {
      this.videoResponse.videoId = result[i].id;
      this.videoResponse.videoPath = result[i].content;
      videoResponseArray.push(this.videoResponse);
      this.videoResponse = {} as VideoResponse;
    }
    return videoResponseArray;
  }

  /**
   * deleteVideoById method will delete video on basis of id
   *   */
  async deleteVideoById(videoId: number): Promise<any> {
    return await this.videoRepository.delete(videoId);
  }
}
