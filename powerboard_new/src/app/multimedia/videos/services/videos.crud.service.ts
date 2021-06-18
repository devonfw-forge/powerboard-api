import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { VideoResponse } from '../model/dto/VideoResponse';
import { Videos } from '../model/entities/videos.entity';

@Injectable()
export class VideosCrudService extends TypeOrmCrudService<Videos> {
  constructor(
    @InjectRepository(Videos) private readonly videoRepository: Repository<Videos>,
    private readonly teamService: TeamCrudService,
  ) {
    super(videoRepository);
  }
  videoResponse: VideoResponse = {} as VideoResponse;

  /**
   * setVideoPath method will save all videos for that team
   * @param {teamId, videoPath} .Takes teamId and videoPath as input
   * @return {Videos} Videos as response for that team
   */
  async setVideoPath(path: string, teamId: string): Promise<Videos> {
    let videos = new Videos();
    videos.content = path;
    videos.team = teamId;
    const team = await this.teamService.findTeamById(teamId);
    if (team) {
      throw new NotFoundException('Team Not Found');
    }
    return await this.videoRepository.save(videos);
  }

  /**
   * getPathOfVideos method will fetch all videos for that team
   * @param {teamId} .Takes teamId as input
   * @return {VideoResponse[]} VideoResponse[] as response for that team
   */
  async getVideosForTeam(teamId: string): Promise<VideoResponse[]> {
    let videoResponseArray = [] as VideoResponse[],
      i;
    const result = await this.videoRepository.find({ where: { team: teamId } });
    if (result == null) {
      return videoResponseArray;
    } else {
      for (i = 0; i < result.length; i++) {
        this.videoResponse.videoId = result[i].id;
        this.videoResponse.videoPath = result[i].content;
        videoResponseArray.push(this.videoResponse);
        this.videoResponse = {} as VideoResponse;
      }
      return videoResponseArray;
    }
  }

  /**
   * deleteVideoById method will delete video on basis of id
   *   */
  async deleteVideoById(videoId: string): Promise<any> {
    return await this.videoRepository.delete(videoId);
  }
}
