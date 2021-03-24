import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintRepositoryMock } from '../../../../test/Sprint/sprint.repository.mock';
import { TeamSpiritRepositoryMock } from '../../../../test/teamSpirit/team-spirit.repository.mock';
import { Sprint } from '../../sprint/model/entities/sprint.entity';

import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from './team-spirit.crud.service';

describe('CodeQualitySnapshotCrudService', () => {
  let service: TeamSpiritCrudService;
  let teamSpiritRepo: TeamSpiritRepositoryMock;
  let sprintRepo: SprintRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamSpiritCrudService,
        {
          provide: getRepositoryToken(TeamSpirit),
          useClass: TeamSpiritRepositoryMock,
        },
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
    teamSpiritRepo = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpirit));
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(teamSpiritRepo).toBeDefined();
    expect(sprintRepo).toBeDefined();
  });

  // it('getTeamSpirit() method should return teamSpiritResponse', async () => {

  //     const sprint = [
  //         {
  //             id: 2,
  //             version: 1,
  //             createdAt: '2021 - 03 - 22T08: 39: 31.870Z',
  //             updatedAt: '2021 - 03 - 22T08: 39: 31.870Z',
  //             sprint_number: 10,
  //             start_date: '2021-02-10',
  //             end_date: '2021-02-25',
  //             status: {
  //                 id: 3,
  //                 version: 1,
  //                 createdAt: '2021 - 03 - 22T08: 39: 31.870Z',
  //                 updatedAt: '2021 - 03 - 22T08: 39: 31.870Z',
  //                 status: 'Completed'
  //             },
  //             team: {
  //                 id: 1,
  //                 version: 1,
  //                 createdAt: '2021-03-12T17:36:31.141Z',
  //                 updatedAt: '2021-03-12T17:36:31.141Z',
  //                 name: 'Diamler Devops',
  //                 business_unit: {
  //                     id: 4,
  //                     version: 1,
  //                     createdAt: '2021-03-12T17:36:31.141Z',
  //                     updatedAt: '2021-03-12T17:36:31.141Z',
  //                     name: 'ADC Bangalore',
  //                     parent_id: 3,
  //                     root_parent_id: 1
  //                 }
  //             },
  //             work_unit: {
  //                 id: 2,
  //                 version: 1,
  //                 createdAt: '2021-03-22T08:39:31.870Z',
  //                 updatedAt: '2021-03-22T08:39:31.870Z',
  //                 work_unit: 'story point'
  //             }

  //         },

  //     ];

  //     const expectedTeamSpiritResponse = {
  //         "teamSpiritRating": 8,
  //         "sprintNumber": 10
  //     }

  //     teamSpiritRepo.find.mockReturnValue(expectedTeamSpiritResponse);
  //     expect(service.getTeamSpirit(1)).toEqual(expectedTeamSpiritResponse);
  //     expect(teamSpiritRepo.find).toHaveBeenCalledWith(sprint[0].team.id);

  // })
});
