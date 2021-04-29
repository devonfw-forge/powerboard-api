import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DailyMeetingLinkMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../dashboard/teams/model/entities/team.entity';
import { DailyMeetingResponse } from '../model/dto/DailyMeetingResponse';
import { DailyMeeting } from '../model/entities/daily-meeting.entity';
import { DailyMeetingCrudService } from './daily-meeting.crud.service';

describe('DailyMeetingCrudService', () => {
  let dailyMeetingLinkService: DailyMeetingCrudService;
  let dailyMeetingLinkRepo: DailyMeetingLinkMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailyMeetingCrudService,
        {
          provide: getRepositoryToken(DailyMeeting),
          useClass: DailyMeetingLinkMock,
        },
      ],
    }).compile();

    dailyMeetingLinkService = module.get<DailyMeetingCrudService>(DailyMeetingCrudService);
    dailyMeetingLinkRepo = module.get<DailyMeetingLinkMock>(getRepositoryToken(DailyMeeting));
  });

  it('should be defined after module initialization', () => {
    expect(dailyMeetingLinkService).toBeDefined();
    expect(dailyMeetingLinkRepo).toBeDefined();
  });

  it('getDailyLinks() method should return DailyMeetingResponse', async () => {
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

    const dailyMeetingLink: DailyMeeting[] = [
      {
        id: '43000bf7-ada7-495c-8019-8d7ab76d490e',
        version: 1,
        createdAt: '2021-04-28T05:57:33.080Z',
        updatedAt: '2021-04-28T05:57:33.080Z',
        type: 'TEAMS',
        dailyMeetingLink:
          'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
        team: team,
      },
    ];

    const expectedDailyMeetingLinkResponse: DailyMeetingResponse[] = [
      {
        dailyMeetingId: '43000bf7-ada7-495c-8019-8d7ab76d490e',
        type: 'TEAMS',
        links:
          'https://teams.microsoft.com/l/meetup-join/19%3ameeting_NjY3MzIyNmYtZTg1YS00MzBjLTk0NmUtMTk4MWE0OWJjNjhl%40thread.v2/0?context=%7b%22Tid%22%3a%2276a2ae5a-9f00-4f6b-95ed-5d33d77c4d61%22%2c%22Oid%22%3a%22d6dd7c98-546f-4dcb-9c39-39c8eeff8a24%22%7d',
      },
    ];
    const createQueryBuilder: any = {
      where: () => createQueryBuilder,
      getMany: jest.fn().mockResolvedValue(dailyMeetingLink),
    };

    jest.spyOn(dailyMeetingLinkRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
    const actualDailyMeetingLinkResponse = await dailyMeetingLinkService.getDailyLinks(team.id);
    expect(dailyMeetingLinkRepo.createQueryBuilder).toBeCalledTimes(1);
    expect(actualDailyMeetingLinkResponse).toEqual(expectedDailyMeetingLinkResponse);
  });
});
