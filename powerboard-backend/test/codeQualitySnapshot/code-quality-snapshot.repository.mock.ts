export class MockRepository {
  public createQueryBuilder = jest.fn(() => this.queryBuilder);

  public manager = { transaction: (a: () => any) => Promise.resolve(a()) };
  public metadata = { connection: { options: { type: null } }, columns: [], relations: [] };

  public save = jest.fn();
  public delete = jest.fn();
  public update = jest.fn();
  public findOne = jest.fn();
  public findOneOrFail = jest.fn();
  public find = jest.fn();
  public getMany = jest.fn();

  public queryBuilder = {
    offset: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    addFrom: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    innerJoinAndSelect: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn(),
    getMany: jest.fn(),
    getOne: jest.fn(),
    delete: jest.fn().mockReturnThis(),
    execute: jest.fn().mockReturnThis(),
  };
}

// export class CodeQualitySnapshotMock {
// codeQuality = [
//     {
//         id: 12,
//         version: 1,
//         createdAt: '2021-03-12T17:36:31.141Z',
//         updatedAt: '2021-03-12T17:36:31.141Z',
//         bugs: 3,
//         debt: 13,
//         code_coverage: 85,
//         status: 'PASSED',
//         snapshot_time: '2021-02-25T09:00:22.000Z',
//         team: {
//             id: 1,
//             version: 1,
//             createdAt: '2021-03-12T17:36:31.141Z',
//             updatedAt: '2021-03-12T17:36:31.141Z',
//             name: 'Diamler Devops',
//             business_unit: {
//                 id: 4,
//                 version: 1,
//                 createdAt: '2021-03-12T17:36:31.141Z',
//                 updatedAt: '2021-03-12T17:36:31.141Z',
//                 name: 'ADC Bangalore',
//                 parent_id: 3,
//                 root_parent_id: 1
//             }
//         }
//     },
//     {
//         id: 10,
//         version: 1,
//         createdAt: '2021-03-22T08:39:31.870Z',
//         updatedAt: '2021-03-22T08:39:31.870Z',
//         bugs: 5,
//         debt: 21,
//         code_coverage: 80,
//         status: 'PASSED',
//         snapshot_time: '2021-02-14T20:40:55.000Z',
//         team: {
//             id: 2,
//             version: 1,
//             createdAt: '2021-03-22T08:39:31.870Z',
//             updatedAt: '2021-03-22T08:39:31.870Z',
//             name: 'IKEA',
//             business_unit: {
//                 id: 13,
//                 version: 1,
//                 createdAt: '2021-03-12T17:36:31.141Z',
//                 updatedAt: '2021-03-12T17:36:31.141Z',
//                 name: 'NA AS CSD',
//                 parent_id: 3,
//                 root_parent_id: 1
//             }
//         }
//     }

// ];

//     async find(teamId: number): Promise<CodeQualityResponse> {

//         let codeQResponse: CodeQualityResponse = {} as CodeQualityResponse;
//         for (let i = 0; i < this.codeQuality.length; i++) {
//             if (this.codeQuality[i].team.id == teamId)
//                 codeQResponse.bugs = this.codeQuality[i].bugs;
//             codeQResponse.codeCoverage = this.codeQuality[i].code_coverage;
//             codeQResponse.debt = this.codeQuality[i].debt;
//             codeQResponse.status = this.codeQuality[i].status;
//         }
//         return codeQResponse;
//     }
// }
