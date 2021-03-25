import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { CodeQualityRepositoryMock, MockRepository } from '../../../../test/mockCrudRepository/crudRepository.mock';
//import { BusinessUnit } from '../../business-units/model/entities/business-unit.entity';

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
    it('should return code quality response of the existed team', async () => {
      // const team1: Team = {
      //     id: 1,
      //     version: 1,
      //     createdAt: '2021-03-12T17:36:31.141Z',
      //     updatedAt: '2021-03-12T17:36:31.141Z',
      //     name: 'Diamler Devops',
      //     business_unit!: {
      //         id: 4,
      //         version: 1,
      //         createdAt: '2021-03-12T17:36:31.141Z',
      //         updatedAt: '2021-03-12T17:36:31.141Z',
      //         name: 'ADC Bangalore',
      //         parent_id: 3,
      //         root_parent_id: 1
      //     }
      // };
      //console.log(team1);
      const expectedCodeQualityResponse = [
        {
          bugs: 3,
          debt: 13,
          codeCoverage: 85,
          status: 'PASSED',
          // id: 12,
          // version: 1,
          // createdAt: '2021-03-22T08:39:31.870Z',
          // updatedAt: '2021-03-22T08:39:31.870Z',
          // bugs: 3,
          // debt: 13,
          // code_coverage: 85,
          // status: 'PASSED',
          // snapshot_time: '2021-02-25T09:00:22.000Z',
          // team: {
          //     id: 1,
          //     version: 1,
          //     createdAt: '2021-03-22T08:39:31.870Z',
          //     updatedAt: '2021-03-22T08:39:31.870Z',
          //     name: 'Diamler Devops',
          //     business_unit: [BusinessUnit]
          // }
        },
      ];

      jest.spyOn(repository, 'find').mockImplementation(() => expectedCodeQualityResponse);
      expect(await service.getCodeQualitySnapshot(1)).toBeCalledTimes(1);

      // repository.find.mockReturnValue(expectedCodeQualityResponse);
      // expect(service.getCodeQualitySnapshot(team1.id)).toEqual(expectedCodeQualityResponse);
      // // And make assertions on how often and with what params your mock's methods are called
      // expect(repository.createQueryBuilder).toHaveBeenCalledWith(team1.id);
    });

    // it('should return an error if a invalid team is provided', () => {
    //     return expect(service.getCodeQualitySnapshot(6)).rejects.toThrow("Team does not exist");
    // });
  });
});

//     describe('getCodeQualitySnapshot', () => {
//         it('should return code quality response when exists for the team', async () => {
//             const team1: Team = {
//                 id: 1,
//                 version: 1,
//                 createdAt: '2021-03-12T17:36:31.141Z',
//                 updatedAt: '2021-03-12T17:36:31.141Z',
//                 name: 'Diamler Devops',
//                 business_unit!: {
//                     id: 4,
//                     version: 1,
//                     createdAt: '2021-03-12T17:36:31.141Z',
//                     updatedAt: '2021-03-12T17:36:31.141Z',
//                     name: 'ADC Bangalore',
//                     parent_id: 3,
//                     root_parent_id: 1
//                 }
//             };

//             const expectedCodeQualityResponse: CodeQualityResponse = {
//                 bugs: 3,
//                 debt: 13,
//                 codeCoverage: 85,
//                 status: 'PASSED',
//             };
//             codeQualitySnapshotRepository.find.mockReturnValue(expectedCodeQualityResponse);
//             expect(service.getCodeQualitySnapshot(1)).toEqual(expectedCodeQualityResponse);
//             expect(codeQualitySnapshotRepository.find).toHaveBeenCalledWith(team1.id);

//         })
//     })

// describe('getCodeQualitySnapshot', () => {
//     it('should return code quality response when exists for the team', async () => {
// const team1: Team = {
//     id: 1,
//     version: 1,
//     createdAt: '2021-03-12T17:36:31.141Z',
//     updatedAt: '2021-03-12T17:36:31.141Z',
//     name: 'Diamler Devops',
//     business_unit!: {
//         id: 4,
//         version: 1,
//         createdAt: '2021-03-12T17:36:31.141Z',
//         updatedAt: '2021-03-12T17:36:31.141Z',
//         name: 'ADC Bangalore',
//         parent_id: 3,
//         root_parent_id: 1
//     }
// };
// const expectedCodeQualityResponse = {
//     bugs: 3,
//     debt: 13,
//     codeCoverage: 85,
//     status: 'PASSED',
// };

// const actualCodeQualityResponse = await service.getCodeQualitySnapshot(team1.id);
// expect(actualCodeQualityResponse).toEqual(expectedCodeQualityResponse);
//     });

//     it('should return undefined when the team does not exists', async () => {
//         await expect(service.getCodeQualitySnapshot(5)).resolves.toBeUndefined();
//     });
// });
