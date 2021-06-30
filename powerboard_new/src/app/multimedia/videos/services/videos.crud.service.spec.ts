import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VideosMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { VideoResponse } from '../model/dto/VideoResponse';
import { Videos } from '../model/entities/videos.entity';
import { VideosCrudService } from './videos.crud.service';

describe('VideosCrudService', () => {
  let videosCrudService: VideosCrudService;
  let videosMockRepo: VideosMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosCrudService,
        {
          provide: getRepositoryToken(Videos),
          useClass: VideosMock,
        },
      ],
    }).compile();

    videosCrudService = module.get<VideosCrudService>(VideosCrudService);
    videosMockRepo = module.get<VideosMock>(getRepositoryToken(Videos));
  });

  it('should be defined after module initialization', () => {
    expect(videosCrudService).toBeDefined();
    expect(videosMockRepo).toBeDefined();
  });
  const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';

  it('getPathOfVideo() should return all the videos present in the database for that team', async () => {
    const videos: Videos[] = [
      {
        id: '52355bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        content: 'aspirants95cf1dfd-43e9-4cc4-8257-a6ba5c70e3bd.mp4',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
      {
        id: '52255bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        content: 'coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
    ];
    const expectedVideoResponses: VideoResponse[] = [
      {
        videoId: '52355bf8-ada5-495c-8019-8d7ab76d488e',
        videoPath: 'aspirants95cf1dfd-43e9-4cc4-8257-a6ba5c70e3bd.mp4',
      },
      {
        videoId: '52255bf8-ada5-495c-8019-8d7ab76d488e',
        videoPath: 'coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4',
      },
    ];

    jest.spyOn(videosMockRepo, 'find').mockImplementation(() => videos);
    const actualVideoResponse = await videosCrudService.getVideosForTeam(teamId);
    expect(videosMockRepo.find).toBeCalledTimes(1);
    expect(actualVideoResponse).toEqual(expectedVideoResponses);
  });

  it('setVideosPath() should save the videos ', async () => {
    const videos = {
      videoPath: 'uploads\\videos\\coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4',
      teamId: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };

    const expectedSavedVideosResponse: Videos = {
      content: 'uploads\\videos\\coronab47da341-3258-4cf2-b19f-9f93de76241a.mp4',
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      id: '52255bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
    };

    jest.spyOn(videosMockRepo, 'save').mockImplementation(() => expectedSavedVideosResponse);
    const actualVideosResponse = await videosCrudService.setVideoPath(videos.videoPath, videos.teamId);
    expect(videosMockRepo.save).toBeCalledTimes(1);
    expect(actualVideosResponse).toEqual(expectedSavedVideosResponse);
  });

  it('deleteVideosById() should delete the given video ', async () => {
    const videoId: string = '52255bf8-ada5-495c-8019-8d7ab76d488e';

    //jest.spyOn(videosMockRepo, 'delete').mockImplementation(() => undefined);

    await videosCrudService.deleteVideoById(videoId);
    expect(videosMockRepo.delete).toBeCalledTimes(1);
    expect(videosMockRepo.delete).toBeCalledWith(videoId);
  });
});
