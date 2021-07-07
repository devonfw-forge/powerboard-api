import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImagesMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { ImageResponse } from '../model/dto/ImageResponse';
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

  const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
  describe('getImagesForTeam()', () => {
    it('getImagesForTeam() should return all the images present in the database', async () => {
      const images: Images[] = [
        {
          id: '52055bf8-ada5-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          image: 'jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
          team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        },
        {
          id: '52155bf8-ada5-495c-8019-8d7ab76d488e',
          version: 1,
          createdAt: '2021-04-29T05:56:27.392Z',
          updatedAt: '2021-04-29T05:56:27.392Z',
          image: 'power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
          team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        },
      ];
      const expectedImageResponses: ImageResponse[] = [
        {
          ImageId: '52055bf8-ada5-495c-8019-8d7ab76d488e',
          ImagePath: 'jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
        },
        {
          ImageId: '52155bf8-ada5-495c-8019-8d7ab76d488e',
          ImagePath: 'power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
        },
      ];

      jest.spyOn(imagesMockRepo, 'find').mockImplementation(() => images);
      const actualImageResponse = await imagesCrudService.getImagesForTeam(teamId);
      expect(imagesMockRepo.find).toBeCalledTimes(1);
      expect(actualImageResponse).toBeDefined();
      expect(actualImageResponse).toEqual(expectedImageResponses);
    });
  });

  describe('setImagePath', () => {
    it('setImagePath() should save the image ', async () => {
      const images = {
        image: 'powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      };

      const expectedSavedImageResponse: Images = {
        image: 'powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        id: 'd123011a-7fd0-4237-b1b5-d3fc657d2467',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
      };

      jest.spyOn(imagesMockRepo, 'save').mockImplementation(() => expectedSavedImageResponse);
      const actualImageResponse = await imagesCrudService.setImagePath(images.image, images.team);
      expect(imagesMockRepo.save).toBeCalledTimes(1);
      expect(actualImageResponse).toBeDefined();
      expect(actualImageResponse).toEqual(expectedSavedImageResponse);
    });
  });

  it('deleteImageById() should delete the given image ', async () => {
    const imageId: string = 'd123011a-7fd0-4237-b1b5-d3fc657d2467';

    jest.spyOn(imagesMockRepo, 'delete').mockImplementation(() => undefined);

    await imagesCrudService.deleteImageById(imageId);
    expect(imagesMockRepo.delete).toBeCalledTimes(1);
    expect(imagesMockRepo.delete).toBeCalledWith(imageId);
  });
});
