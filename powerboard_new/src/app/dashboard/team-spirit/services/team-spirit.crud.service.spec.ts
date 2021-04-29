import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  SprintRepositoryMock,
  TeamSpiritRepositoryMock,
} from '../../../../../test/mockCrudRepository/crudRepository.mock';

import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { Team } from '../../teams/model/entities/team.entity';

import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from './team-spirit.crud.service';

describe('TeamSpiritCrudService', () => {
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

  it('getTeamSpirit() method should return teamSpiritResponse', async () => {
    const team1: Team = {
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
    const sprint: Sprint = {
      id: '20255bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      sprint_number: 10,
      start_date: '2021-02-10',
      end_date: '2021-02-25',
      status: '11155bf3-ada5-495c-8019-8d7ab76d488e',
      team: team1,
      work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
    };

    const teamSpirit: TeamSpirit = {
      id: '20111bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-22T08:39:31.870Z',
      updatedAt: '2021-03-22T08:39:31.870Z',
      team_spirit_rating: 8,
      sprint: sprint,
    };

    const expectedTeamSpiritResponse = {
      teamSpiritRating: 8,
      sprintNumber: 10,
    };

    const createQueryBuilder1: any = {
      limit: () => createQueryBuilder1,
      where: () => createQueryBuilder1,
      getOne: jest.fn().mockResolvedValue(teamSpirit),
    };

    const createQueryBuilder2: any = {
      limit: () => createQueryBuilder2,
      groupBy: () => createQueryBuilder2,
      where: () => createQueryBuilder2,
      orderBy: () => createQueryBuilder2,
      skip: () => createQueryBuilder2,
      take: () => createQueryBuilder2,
      getOne: jest.fn().mockResolvedValue(sprint),
    };

    jest.spyOn(teamSpiritRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
    const actualTeamSpirit = await service.getTeamSpirit(team1.id);
    expect(sprintRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(teamSpiritRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(actualTeamSpirit).toEqual(expectedTeamSpiritResponse);
  });
});
