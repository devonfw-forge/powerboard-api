import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SprintRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { Team } from '../../teams/model/entities/team.entity';
import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';

import { Sprint } from '../model/entities/sprint.entity';

import { SprintCrudService } from './sprint.crud.service';

describe('SprintCrudService', () => {
  let service: SprintCrudService;
  let sprintRepo: SprintRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SprintCrudService,
        {
          provide: getRepositoryToken(Sprint),
          useClass: SprintRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<SprintCrudService>(SprintCrudService);
    sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(sprintRepo).toBeDefined();
  });

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

  it('getSprintDetailResponse() should return sprint Detail Response', async () => {
    const sprint: Sprint = {
      id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
      sprint_number: 11,
      start_date: '2021-04-24',
      end_date: '2021-05-22',
      status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
      team: team1,
      work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
    };

    const sprintDetail: any = [
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-04-29T05:56:27.392Z',
        sprint_updatedAt: '2021 - 04 - 28T05: 57: 33.080Z',
        sprint_sprint_number: 11,
        sprint_start_date: new Date('2021-04-24T18:30:00.000Z'),
        sprint_end_date: new Date('2021 - 05 - 22T18: 30: 00.000Z'),
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: new Date('2021 - 04 - 26T09: 00: 00.000Z'),
        ssm_value: '140',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-04-28T05:57:33.080Z',
        sprint_updatedAt: '2021-04-28T05:57:33.080Z',
        sprint_sprint_number: 11,
        sprint_start_date: new Date('2021-04-24T18:30:00.000Z'),
        sprint_end_date: new Date('2021-05-22T18:30:00.000Z'),
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: new Date('2021-04-26T09:00:00.000Z'),
        ssm_value: '12',
        smt_name: 'Work Completed',
      },
    ];
    const expectedSprintDetailResponse: SprintDetailResponse = {
      Sprint_current_day: 13,
      sprint_number: 11,
      Sprint_days: 28,
    };
    console.log(expectedSprintDetailResponse);
    const createQueryBuilder1: any = {
      limit: () => createQueryBuilder1,
      groupBy: () => createQueryBuilder1,
      where: () => createQueryBuilder1,
      orderBy: () => createQueryBuilder1,
      skip: () => createQueryBuilder1,
      take: () => createQueryBuilder1,
      addSelect: () => createQueryBuilder1,
      innerJoin: () => createQueryBuilder1,
      leftJoin: () => createQueryBuilder1,
      andWhere: () => createQueryBuilder1,
      getOne: jest.fn().mockResolvedValue(sprint),
      getRawMany: jest.fn().mockResolvedValue(sprintDetail),
    };

    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
    // const actualSprintDetail = await service.getSprintDetailResponse(team1.id);
    await service.getSprintDetailResponse(team1.id);
    expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(1);
    // expect(actualSprintDetail).toEqual(expectedSprintDetailResponse);
  });

  it('getBurnDown() should return burndown details', async () => {
    const sprint: Sprint = {
      id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
      sprint_number: 11,
      start_date: '2021-04-24',
      end_date: '2021-05-22',
      status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
      team: team1,
      work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
    };
    const sprintForBurndown: any = [
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-04-29T05:56:27.392Z',
        sprint_updatedAt: '2021-04-29T05:56:27.392Z',
        sprint_sprint_number: 11,
        sprint_start_date: new Date('2021-04-24T18:30:00.000Z'),
        sprint_end_date: new Date('2021-05-22T18:30:00.000Z'),
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: new Date('2021-04-26T09:00:00.000Z'),
        ssm_value: '140',
        sw_work_unit: 'story point',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021-04-29T05:56:27.392Z',
        sprint_updatedAt: '2021-04-29T05:56:27.392Z',
        sprint_sprint_number: 11,
        sprint_start_date: new Date('2021-04-24T18:30:00.000Z'),
        sprint_end_date: new Date('2021-05-22T18:30:00.000Z'),
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ss_date_time: new Date('2021-04-26T09:00:00.000Z'),
        ssm_value: '12',
        sw_work_unit: 'story point',
        smt_name: 'Work Completed',
      },
    ];

    const expectedBurndownResponse = {
      workUnit: 'story point',
      remainingDays: 15,
      remainingWork: 128,
      count: 53,
      burndownStatus: 'Behind Time',
    };

    const createQueryBuilder: any = {
      limit: () => createQueryBuilder,
      groupBy: () => createQueryBuilder,
      where: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      addSelect: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      leftJoin: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,
      getOne: jest.fn().mockResolvedValue(sprint),
      getRawMany: jest.fn().mockResolvedValue(sprintForBurndown),
    };

    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    const actualBurndownResponse = await service.getBurndown(team1.id);
    expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(1);
    expect(actualBurndownResponse).toEqual(expectedBurndownResponse);
  });

  it('getVelocityComparison() should return velocity comparison details', async () => {
    const sprint: Sprint = {
      id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
      version: 1,
      createdAt: '2021-04-29T05:56:27.392Z',
      updatedAt: '2021-04-29T05:56:27.392Z',
      sprint_number: 11,
      start_date: '2021-04-24',
      end_date: '2021-05-22',
      status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
      team: team1,
      work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
    };
    const sprintForVelocityComparison: any = [
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021 - 04 - 28T05: 57: 33.080Z',
        sprint_updatedAt: '2021 - 04 - 28T05: 57: 33.080Z',
        sprint_sprint_number: 11,
        sprint_start_date: '2021 - 04 - 24T18: 30: 00.000Z',
        sprint_end_date: '2021 - 05 - 22T18: 30: 00.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ssm_value: '140',
        smt_name: 'Work Committed',
      },
      {
        sprint_id: '20355bf8-ada5-495c-8019-8d7ab76d488e',
        sprint_version: 1,
        sprint_createdAt: '2021 - 04 - 28T05: 57: 33.080Z',
        sprint_updatedAt: '2021 - 04 - 28T05: 57: 33.080Z',
        sprint_sprint_number: 11,
        sprint_start_date: '2021 - 04 - 24T18: 30: 00.000Z',
        sprint_end_date: '2021 - 05 - 22T18: 30: 00.000Z',
        sprint_status: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        sprint_team_id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
        sprint_work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
        st_status: 'In Progress',
        ss_id: '80255bf8-ada5-495c-8019-8d7ab76d488e',
        ssm_value: '12',
        smt_name: 'Work Completed',
      },
    ];

    const expectedVelocityResponse: VelocityComparisonResponse = {
      Avg: 115,
      Committed: 140,
      Completed: 12,
    };
    console.log(expectedVelocityResponse);
    const createQueryBuilder: any = {
      limit: () => createQueryBuilder,
      groupBy: () => createQueryBuilder,
      where: () => createQueryBuilder,
      orderBy: () => createQueryBuilder,
      skip: () => createQueryBuilder,
      take: () => createQueryBuilder,
      addSelect: () => createQueryBuilder,
      innerJoin: () => createQueryBuilder,
      leftJoin: () => createQueryBuilder,
      andWhere: () => createQueryBuilder,
      getOne: jest.fn().mockResolvedValue(sprint),
      getRawMany: jest.fn().mockResolvedValue(sprintForVelocityComparison),
    };

    jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);

    await service.getVelocityComparison(team1.id);
    // const actualVelocityComparison = await service.getVelocityComparison(team1.id);
    expect(sprintRepo.createQueryBuilder).toHaveBeenCalledTimes(2);
    //expect(actualVelocityComparison).toEqual(expectedVelocityResponse);
  });
});
