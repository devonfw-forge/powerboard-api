import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DailyMeetingLinkMock } from '../../../../test/mockCrudRepository/crudRepository.mock';
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
});
