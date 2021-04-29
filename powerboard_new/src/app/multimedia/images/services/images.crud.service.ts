import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { ImageResponse } from '../model/dto/ImageResponse';
import { Images } from '../model/entities/image.entity';

@Injectable()
export class ImagesCrudService extends TypeOrmCrudService<Images> {
  constructor(@InjectRepository(Images) private readonly imageRepository: Repository<Images>) {
    super(imageRepository);
  }
  imageResponse: ImageResponse = {} as ImageResponse;

  /**
   * setImagePath method will set image fot that team
   * @param {teamId, path} .Takes teamId and path as input
   * @return {Images} Images as response for that team
   */
  async setImagePath(path: string, teamId: string): Promise<Images> {
    let image = new Images();
    image.image = path;
    image.team = teamId;
    return await this.imageRepository.save(image);
  }

  /**
   * getPathOfImage method will fetch all images fot that team
   * @param {teamId} .Takes teamId as input
   * @return {TeamLinks} ImageResponse[] as response for that team
   */
  async getPathOfImage(teamId: string): Promise<ImageResponse[]> {
    const result = await this.imageRepository.find({ where: { team: teamId } });

    let i = 0;
    let dailyMeetingArray = [];
    for (i = 0; i < result.length; i++) {
      this.imageResponse.ImageId = result[i].id;
      this.imageResponse.ImagePath = result[i].image;
      dailyMeetingArray.push(this.imageResponse);
      this.imageResponse = {} as ImageResponse;
    }
    return dailyMeetingArray;
  }

  /**
   * deleteImageById method will delete the images on basis of id
   */
  async deleteImageById(imageId: string): Promise<any> {
    return await this.imageRepository.delete(imageId);
  }
}
