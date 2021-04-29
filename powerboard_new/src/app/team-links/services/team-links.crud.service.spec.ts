import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamLinksMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../dashboard/teams/model/entities/team.entity';
import { TeamLinkDTO } from '../model/dto/TeamLinkDTO';
import { TeamLinks } from '../model/entities/team-links.entity';
import { TeamLinksCrudService } from './team-links.crud.service';

describe('TeamLinksCrudService', () => {
  let teamLinkService: TeamLinksCrudService;
  let teamLinkRepo: TeamLinksMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamLinksCrudService,
        {
          provide: getRepositoryToken(TeamLinks),
          useClass: TeamLinksMock,
        },
      ],
    }).compile();

    teamLinkService = module.get<TeamLinksCrudService>(TeamLinksCrudService);
    teamLinkRepo = module.get<TeamLinksMock>(getRepositoryToken(TeamLinks));
  });

  it('should be defined after module initialization', () => {
    expect(teamLinkService).toBeDefined();
    expect(teamLinkRepo).toBeDefined();
  });

  it('getTeamLinks() method should return TeamLinkResponse', async () => {
    const team: Team = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Diamler Devops',
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
    const teamLinks: TeamLinks[] = [
      {
        id: '51055bf7-ada6-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-28T05:57:33.080Z',
        updatedAt: '2021-04-28T05:57:33.080Z',
        title: 'Jira Cloud',
        link: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
        team: team,
      },
      {
        id: '51055bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-28T05:57:33.080Z',
        updatedAt: '2021-04-28T05:57:33.080Z',
        title: 'GitHub',
        link: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
        team: team,
      },
    ];

    const expectedTeamLinksResponse = [
      {
        teamLinkId: '51055bf7-ada6-495c-8019-8d7ab76d488e',
        title: 'Jira Cloud',
        links: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
      },
      {
        teamLinkId: '51055bf8-ada5-495c-8019-8d7ab76d488e',
        title: 'GitHub',
        links: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
      },
    ];

    const createQueryBuilder: any = {
      limit: () => createQueryBuilder,
      where: () => createQueryBuilder,
      getMany: jest.fn().mockResolvedValue(teamLinks),
    };

    jest.spyOn(teamLinkRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
    const actualTeamLinksResponse = await teamLinkService.getTeamLinks(team.id);
    expect(teamLinkRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(actualTeamLinksResponse).toEqual(expectedTeamLinksResponse);
  });

  it('createTeamLinks() method should return saved TeamLinks', async () => {
    const team: Team = {
      id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-03-12T17:36:31.141Z',
      updatedAt: '2021-03-12T17:36:31.141Z',
      name: 'Diamler Devops',
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
    const teamLinkDTO: TeamLinkDTO = {
      teamId: team,
      title: 'facebook',
      links: 'https://facebook.com',
    };

    const expectedTeamLinkSaved = {
      title: 'facebook',
      link: 'https://facebook.com',
      team: '46455bf7-ada7-495c-8019-8d7ab76d488e',
      id: '2299aacf-ba66-4815-b082-f02a68d96008',
    };
    jest.spyOn(teamLinkRepo, 'save').mockImplementation(() => expectedTeamLinkSaved);
    const actualSavedTeamLink = await teamLinkService.createTeamLinks(teamLinkDTO);
    expect(teamLinkRepo.save).toBeCalledTimes(1);
    expect(actualSavedTeamLink).toEqual(expectedTeamLinkSaved);
  });
});
