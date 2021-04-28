import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VideosMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
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
});
