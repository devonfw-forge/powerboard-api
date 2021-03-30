import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CodeQualityRepositoryMock, MockRepository } from '../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../teams/model/entities/team.entity';
import { CodeQualityResponse } from '../model/dto/CodeQualityResponse';

import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';

import { CodeQualitySnapshotCrudService } from './code-quality-snapshot.crud.service';

describe('CodeQualitySnapshotCrudService', () => {
  let service: CodeQualitySnapshotCrudService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeQualitySnapshotCrudService,
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: CodeQualityRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CodeQualitySnapshotCrudService>(CodeQualitySnapshotCrudService);
    repository = module.get<MockRepository>(getRepositoryToken(CodeQualitySnapshot));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('getCodeQualitySnapshot', () => {
    const team1: Team = {
      id: 1,
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Diamler Devops',
      business_unit: {
        id: 4,
        version: 1,
        createdAt: '2021-03-12T17:36:31.141Z',
        updatedAt: '2021-03-12T17:36:31.141Z',
        name: 'ADC Bangalore',
        parent_id: 3,
        root_parent_id: 1,
      },
    };

    const codeQuality: CodeQualitySnapshot = {
      id: 12,
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      bugs: 3,
      debt: 4,
      code_coverage: 90,
      status: 'PASSED',
      snapshot_time: '2021-02-25T09:00:22.000Z',
      team: {
        id: 1,
        version: 1,
        createdAt: '2021-03-22T08:39:31.870Z',
        updatedAt: '2021-03-22T08:39:31.870Z',
        name: 'Diamler Devops',
        business_unit: {
          id: 4,
          version: 1,
          createdAt: '2021-03-12T17:36:31.141Z',
          updatedAt: '2021-03-12T17:36:31.141Z',
          name: 'ADC Bangalore',
          parent_id: 3,
          root_parent_id: 1,
        },
      },
    };

    it('should return code quality response of the existed team', async () => {
      const expectedCodeQualityResponse: CodeQualityResponse = {
        bugs: 3,
        debt: 4,
        codeCoverage: 90,
        status: 'PASSED',
      };

      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        getOne: jest.fn().mockResolvedValue(codeQuality),
      };

      jest.spyOn(repository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
      const actualCodeQualityResponse = await service.getCodeQualitySnapshot(team1.id);
      expect(repository.createQueryBuilder).toBeCalledTimes(1);
      expect(actualCodeQualityResponse).toEqual(expectedCodeQualityResponse);
    });
  });
});
