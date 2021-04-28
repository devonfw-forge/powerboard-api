import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImagesMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Images } from '../model/entities/image.entity';
import { ImagesCrudService } from './images.crud.service';

describe('ImagesCrudService', () => {
  let imagesCrudService: ImagesCrudService;
  let imagesMockRepo: ImagesMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesCrudService,
        {
          provide: getRepositoryToken(Images),
          useClass: ImagesMock,
        },
      ],
    }).compile();

    imagesCrudService = module.get<ImagesCrudService>(ImagesCrudService);
    imagesMockRepo = module.get<ImagesMock>(getRepositoryToken(Images));
  });

  it('should be defined after module initialization', () => {
    expect(imagesCrudService).toBeDefined();
    expect(imagesMockRepo).toBeDefined();
  });
});
