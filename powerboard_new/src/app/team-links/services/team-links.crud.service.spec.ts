import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TeamLinksMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
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
});
