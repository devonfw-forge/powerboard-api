import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamLinksMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
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
  const teamId: string = '46455bf7-ada7-495c-8019-8d7ab76d488e';
  it('getTeamLinks() method should return TeamLinkResponse', async () => {
    const teamLinks: TeamLinks[] = [
      {
        id: '51055bf7-ada6-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-28T05:57:33.080Z',
        updatedAt: '2021-04-28T05:57:33.080Z',
        title: 'Jira Cloud',
        link: 'https://powerboard-capgemini.atlassian.net/jira/software/projects/DUM/boards/3',
        team: teamId,
      },
      {
        id: '51055bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-04-28T05:57:33.080Z',
        updatedAt: '2021-04-28T05:57:33.080Z',
        title: 'GitHub',
        link: 'https://github.com/devonfw-forge/powerboard-api/blob/develop-0.0.1/',
        team: teamId,
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
    const actualTeamLinksResponse = await teamLinkService.getTeamLinks(teamId);
    expect(teamLinkRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(actualTeamLinksResponse).toEqual(expectedTeamLinksResponse);
  });

  it('createTeamLinks() method should return saved TeamLinks', async () => {
    const teamLinkDTO: TeamLinkDTO = {
      teamId: teamId,
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
  it('deleteTeamLinkById() should delete the given team links ', async () => {
    const teamLinkId: string = '2299aacf-ba66-4815-b082-f02a68d96008';

    jest.spyOn(teamLinkRepo, 'delete').mockImplementation(() => undefined);

    await teamLinkService.deleteTeamLinkById(teamLinkId);
    expect(teamLinkRepo.delete).toBeCalledTimes(1);
    expect(teamLinkRepo.delete).toBeCalledWith(teamLinkId);
  });
});
