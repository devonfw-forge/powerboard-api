import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ImagesMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../../dashboard/teams/model/entities/team.entity';
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

  const team: Team = {
    id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    version: 1,
    createdAt: '2021-03-12T17:36:31.141Z',
    updatedAt: '2021-03-12T17:36:31.141Z',
    name: 'Diamler Devops',
    logo: 'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png',
    business_unit: {
      id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'ADC Bangalore',
      parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
      root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
    },
  };

  it('getPathOfImage() should return all the images present in the database', async () => {
    const images: Images[] = [
      {
        id: '52055bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        image: 'uploads\\profileimages\\jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
      {
        id: '52155bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-29T05:56:27.392Z',
        updatedAt: '2021-04-29T05:56:27.392Z',
        image: 'uploads\\profileimages\\power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
        team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      },
    ];
    const expectedImageResponses: ImageResponse[] = [
      {
        ImageId: '52055bf8-ada5-495c-8019-8d7ab76d488e',
        ImagePath: 'uploads\\profileimages\\jirab05d9639-10f5-4ec5-85bf-087731ce4f8b.png',
      },
      {
        ImageId: '52155bf8-ada5-495c-8019-8d7ab76d488e',
        ImagePath: 'uploads\\profileimages\\power46455bf7-ada7-495c-8019-8d7ab76d497e.png',
      },
    ];

    jest.spyOn(imagesMockRepo, 'find').mockImplementation(() => images);
    const actualImageResponse = await imagesCrudService.getPathOfImage(team.id);
    expect(imagesMockRepo.find).toBeCalledTimes(1);
    expect(actualImageResponse).toEqual(expectedImageResponses);
  });

  it('setImagePath() should save the image ', async () => {
    //const path = './uploads/profileimages';

    const images = {
      image: 'uploads\\profileimages\\powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
    };

    const expectedSavedImageResponse: Images = {
      image: 'uploads\\profileimages\\powerb60f5d38-7a1e-430e-9d88-0a620359f191.png',
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      id: 'd123011a-7fd0-4237-b1b5-d3fc657d2467',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
    };

    jest.spyOn(imagesMockRepo, 'save').mockImplementation(() => expectedSavedImageResponse);
    const actualImageResponse = await imagesCrudService.setImagePath(images.image, images.team);
    expect(imagesMockRepo.save).toBeCalledTimes(1);
    expect(actualImageResponse).toEqual(expectedSavedImageResponse);
  });

  it('deleteImageById() should delete the given image ', async () => {
    const imageId: string = 'd123011a-7fd0-4237-b1b5-d3fc657d2467';

    jest.spyOn(imagesMockRepo, 'delete').mockImplementation(() => undefined);

    await imagesCrudService.deleteImageById(imageId);
    expect(imagesMockRepo.delete).toBeCalledTimes(1);
    expect(imagesMockRepo.delete).toBeCalledWith(imageId);
  });
});
