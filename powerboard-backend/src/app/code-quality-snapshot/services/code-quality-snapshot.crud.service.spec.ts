import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockRepository } from '../../../../test/codeQualitySnapshot/code-quality-snapshot.repository.mock';

import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';

import { CodeQualitySnapshotCrudService } from './code-quality-snapshot.crud.service';

describe('CodeQualitySnapshotCrudService', () => {
  let service: CodeQualitySnapshotCrudService;
  let codeQualitySnapshotRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CodeQualitySnapshotCrudService,
        {
          provide: getRepositoryToken(CodeQualitySnapshot),
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<CodeQualitySnapshotCrudService>(CodeQualitySnapshotCrudService);
    codeQualitySnapshotRepository = module.get<MockRepository>(getRepositoryToken(CodeQualitySnapshot));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(codeQualitySnapshotRepository).toBeDefined();
  });

  // describe('getCodeQualitySnapshot', () => {
  //     it('should return code quality response when exists for the team', async () => {
  //         const team1: Team = {
  //             id: 1,
  //             version: 1,
  //             createdAt: '2021-03-12T17:36:31.141Z',
  //             updatedAt: '2021-03-12T17:36:31.141Z',
  //             name: 'Diamler Devops',
  //             business_unit!: {
  //                 id: 4,
  //                 version: 1,
  //                 createdAt: '2021-03-12T17:36:31.141Z',
  //                 updatedAt: '2021-03-12T17:36:31.141Z',
  //                 name: 'ADC Bangalore',
  //                 parent_id: 3,
  //                 root_parent_id: 1
  //             }
  //         };

  //         const expectedCodeQualityResponse: CodeQualityResponse = {
  //             bugs: 3,
  //             debt: 13,
  //             codeCoverage: 85,
  //             status: 'PASSED',
  //         };
  //         codeQualitySnapshotRepository.find.mockReturnValue(expectedCodeQualityResponse);
  //         expect(service.getCodeQualitySnapshot(1)).toEqual(expectedCodeQualityResponse);
  //         expect(codeQualitySnapshotRepository.find).toHaveBeenCalledWith(team1.id);

  //     })
  // })
});

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

// describe('CodeQualityCrudService', () => {
//     let codeQualitySnapshotCrudService: CodeQualitySnapshotCrudService;
//     let codeQualitySnapshotRepository: CodeQualitySnapshotMock;

//     beforeAll(async () => {
//         const module: TestingModule = await Test.createTestingModule({
//             providers: [
//                 CodeQualitySnapshotCrudService,
//                 {
//                     provide: 'CodeQualitySnapshotRepository',
//                     useClass: CodeQualitySnapshotMock
//                 },

//             ],
//         }).compile();

//         codeQualitySnapshotCrudService = module.get(CodeQualitySnapshotCrudService);
//         codeQualitySnapshotRepository = module.get<CodeQualitySnapshotMock>('CodeQualitySnapshotRepository');
//     });

//     it('should be defined after module initialization', () => {
//         expect(codeQualitySnapshotCrudService).toBeDefined();
//         expect(codeQualitySnapshotRepository).toBeDefined();
//     });

//     describe('getCodeQualitySnapshot', () => {
//         it('should return code quality response when exists for the team', async () => {
//             // const team1: Team = {
//             //     id: 1,
//             //     version: 1,
//             //     createdAt: '2021-03-12T17:36:31.141Z',
//             //     updatedAt: '2021-03-12T17:36:31.141Z',
//             //     name: 'Diamler Devops',
//             //     business_unit!: {
//             //         id: 4,
//             //         version: 1,
//             //         createdAt: '2021-03-12T17:36:31.141Z',
//             //         updatedAt: '2021-03-12T17:36:31.141Z',
//             //         name: 'ADC Bangalore',
//             //         parent_id: 3,
//             //         root_parent_id: 1
//             //     }
//             // };
//             const expectedCodeQualityResponse = {
//                 bugs: 3,
//                 debt: 13,
//                 codeCoverage: 85,
//                 status: 'PASSED',
//             };

//             const actualCodeQualityResponse = await codeQualitySnapshotCrudService.getCodeQualitySnapshot(1);
//             expect(actualCodeQualityResponse).toEqual(expectedCodeQualityResponse);
//         });

//         it('should return undefined when the team does not exists', async () => {
//             await expect(codeQualitySnapshotCrudService.getCodeQualitySnapshot(5)).resolves.toBeUndefined();
//         });
//     });
// });
