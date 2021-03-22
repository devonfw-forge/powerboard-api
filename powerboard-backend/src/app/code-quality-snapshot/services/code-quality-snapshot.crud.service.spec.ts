import { Test, TestingModule } from '@nestjs/testing';
import { find } from 'lodash';
import { FindConditions, FindOneOptions } from 'typeorm';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';
import { CodeQualitySnapshotCrudService } from './code-quality-snapshot.crud.service';
import { Team } from '../../teams/model/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../../app.module'; 

class CodeQualitySnapshotMock {
 
    codeQualitySnapshots!: CodeQualitySnapshot[]
    team1: Team = {
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
          root_parent_id: 1
      }
    }
    constructor() {
        this.codeQualitySnapshots = [
            {
                id: 12,
                version: 1,
                createdAt: '2021-03-12T17:36:31.141Z',
                updatedAt: '2021-03-12T17:36:31.141Z',
                bugs: 3,
                debt: 13,
                code_coverage: 85,
                status: 'PASSED',
                snapshot_time: '2021-02-25T09:00:22.000Z',
                team: {
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
                    root_parent_id: 1
                }
                }
            }
        ];
    }
 
    async find(options: FindOneOptions<CodeQualitySnapshot> | undefined): Promise<Partial<CodeQualitySnapshot> | undefined> {
        return find(this.codeQualitySnapshots, {
            team: (options!.where! as FindConditions<CodeQualitySnapshot>).team as CodeQualitySnapshot,
        });
    }
}
jest.setTimeout(90000);
describe('CodeQualityCrudService', () => {
    let codeQualitySnapshotCrudService: CodeQualitySnapshotCrudService;
   // let codeQualitySnapshotRepository: CodeQualitySnapshotMock;
 
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports:[TypeOrmModule.forFeature([CodeQualitySnapshot]),AppModule],
            providers: [
                CodeQualitySnapshotCrudService,
                {
                    provide: 'CodeQualityRepository',
                    useClass: CodeQualitySnapshotMock,
                },
            ],    
        }).compile();
 
        codeQualitySnapshotCrudService = module.get<CodeQualitySnapshotCrudService>(CodeQualitySnapshotCrudService);
       // codeQualitySnapshotRepository = module.get<CodeQualitySnapshotMock>('CodeQualityRepository');
 
    });
 
    it('should be defined after module initialization', () => {
        expect(codeQualitySnapshotCrudService).toBeUndefined();
       // expect(codeQualitySnapshotRepository).toBeUndefined();
    });
 
    // describe('getCodeQualitySnapshot', () => {
    //     it('should return code quality response when exists for the team', async () => {
    //         // const team1: Team = {
    //         //     id: 1,
    //         //     version: 1,
    //         //     createdAt: '2021-03-12T17:36:31.141Z',
    //         //     updatedAt: '2021-03-12T17:36:31.141Z',
    //         //     name: 'Diamler Devops',
    //         //     business_unit!: new BusinessUnit()
    //         // };
    //         const expectedCodeQualityResponse = {
    //             bugs: 3,
    //             debt: 13,
    //             codeCoverage: 85,
    //             status: 'PASSED',
    //         };
    //         const actualCodeQualityResponse = await codeQualitySnapshotCrudService.getCodeQualitySnapshot(1);
    //         expect(actualCodeQualityResponse).toStrictEqual(expectedCodeQualityResponse);
    //     });
    // });
 });
