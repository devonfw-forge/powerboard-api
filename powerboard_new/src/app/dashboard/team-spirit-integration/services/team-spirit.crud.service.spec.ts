import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs/internal/observable/of';
import { AxiosResponse } from 'axios';
import { TeamSpiritRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { TeamSpiritMedian } from '../model/entities/team-spirit-median.entity';
import { TeamSpiritCrudService } from './team-spirit.crud.service';
import { TeamSpiritUserDTO } from '../model/dto/TeamSpiritUserDTO';

describe('TeamSpiritCrudService', () => {
  let teamSpiritService: TeamSpiritCrudService;
  let httpService: HttpService;
  let teamSpiritRepository: TeamSpiritRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        TeamSpiritCrudService,
        {
          provide: getRepositoryToken(TeamSpiritMedian),
          useClass: TeamSpiritRepositoryMock,
        },
      ],
    }).compile();

    teamSpiritService = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
    httpService = module.get<HttpService>(HttpService);
    teamSpiritRepository = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpiritMedian));
  });

  it('should be defined after module initialization', () => {
    expect(teamSpiritService).toBeDefined();
    expect(httpService).toBeDefined();
    expect(teamSpiritRepository).toBeDefined();
  });

  describe('getTeamSpiritFromSurvey', () => {
    it('getTeamSpiritFromSurvey() method should return teamSpiritResponse', async () => {
      const teamName = 'Diamler Devops';

      const teamSpiritMedian = {
        id: '70023bf8-ada5-495c-8019-8d7ab76d488e',
        version: 1,
        createdAt: '2021-06-25T08:25:00.982Z',
        updatedAt: '2021-06-25T08:25:00.982Z',
        surveyMedian: 7,
        startDate: '2021-06-22T07:50:34.000Z',
        endDate: '2021-07-02T07:55:40.000Z',
        surveyCode: 'AZ4r52',
      };

      const createQueryBuilder: any = {
        limit: () => createQueryBuilder,
        groupBy: () => createQueryBuilder,
        where: () => createQueryBuilder,
        orderBy: () => createQueryBuilder,
        skip: () => createQueryBuilder,
        take: () => createQueryBuilder,
        getOne: jest.fn().mockResolvedValue(teamSpiritMedian),
      };

      const expectedTeamSpiritResponse = {
        teamSpiritRating: 7,
      };
      jest.spyOn(teamSpiritRepository, 'createQueryBuilder').mockImplementation(() => createQueryBuilder);
      const actualTeamSpirit = await teamSpiritService.getTeamSpiritFromSurvey(teamName);
      expect(teamSpiritRepository.createQueryBuilder).toBeCalledTimes(1);
      expect(actualTeamSpirit).toEqual(expectedTeamSpiritResponse);
    });
  });

  describe('addTeamToTeamSpirit', () => {
    const teamDTO = {
      Name: 'flip',
      Frequency: 15,
      Num_mumbers: 5,
      StartDate: '2021-06-23T00:00:00Z',
    };
    it('addTeamToTeamSpirit() method should successfully create a new team', async () => {
      const createdTeam = {
        Name: 'flip',
        Num_mumbers: 5,
        StartDate: '2021-06-23T00:00:00Z',
        Frequency: 15,
        Surveys: null,
        Users: null,
      };
      const httpResponse: AxiosResponse<any> = {
        data: createdTeam,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 200,
        statusText: 'OK',
      };
      const TeamResponse: AxiosResponse<any> = {
        data: undefined,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 404,
        statusText: 'Not Found',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(TeamResponse));
      jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(httpResponse));

      const actualResponse = await teamSpiritService.addTeamToTeamSpirit(teamDTO);
      // await teamSpiritService.addTeamToTeamSpirit(teamDTO);
      expect(httpService.post).toHaveBeenCalledTimes(1);
      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(actualResponse).toEqual(createdTeam);
    });
    it(' should throw error if team already present', async () => {
      const TeamResponse: AxiosResponse<any> = {
        data: {},
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 404,
        statusText: 'Not Found',
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(TeamResponse));

      try {
        await teamSpiritService.addTeamToTeamSpirit(teamDTO);
      } catch (e) {
        expect(e).toMatch('Team ' + teamDTO.Name + ' already exists');
      }
    });
  });

  describe('updateTeamConfiguration', () => {
    const updatedTeamDTO = {
      Name: 'flip',
      Num_mumbers: 7,
      StartDate: '2021-05-15T00:00:00Z',
      Frequency: 11,
    };
    const teamName = 'flip';

    it('updateTeamConfiguration() method should successfully update the team and return the updated Team response', async () => {
      const updatedTeamResponse = {
        Name: 'flip',
        Num_mumbers: 7,
        StartDate: '2021-05-15T00:00:00Z',
        Frequency: 11,
        Surveys: null,
        Users: null,
      };

      const httpResponse: AxiosResponse<any> = {
        data: updatedTeamResponse,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 200,
        statusText: 'OK',
      };

      const getTeamResponse = {
        data: {},
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(getTeamResponse));
      jest.spyOn(httpService, 'put').mockImplementationOnce(() => of(httpResponse));
      const actualResponse = await teamSpiritService.updateTeamConfiguration(updatedTeamDTO, teamName);
      expect(httpService.get).toHaveBeenCalledTimes(1);
      expect(httpService.put).toHaveBeenCalledTimes(1);
      expect(actualResponse).toEqual(updatedTeamResponse);
    });

    it(' should throw error if team is not already present', async () => {
      const TeamResponse: AxiosResponse<any> = {
        data: undefined,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 404,
        statusText: 'Not Found',
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(TeamResponse));

      try {
        await teamSpiritService.updateTeamConfiguration(updatedTeamDTO, teamName);
      } catch (e) {
        expect(e).toMatch('Team ' + teamName + ' does not exist');
      }
    });
  });

  describe(' addUserToTeam', () => {
    const userDTO: TeamSpiritUserDTO = {
      Email: 'andy@mail.com',
      Full_Name: 'andy',
      Password: 'andy',
    };

    const teamName = 'flip';

    it('addUserToTeam() method should successfully update the team and return the updated Team response', async () => {
      const httpResponse: AxiosResponse<any> = {
        data: {},
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 200,
        statusText: 'OK',
      };

      const existedTeam = {
        Name: 'flip',
        Num_mumbers: 7,
        StartDate: '2021-05-15T00:00:00Z',
        Frequency: 11,
        Surveys: [
          {
            Code: 'flip-hSnSQ',
            StartDate: '2021-06-23T00:00:00Z',
            EndDate: '2021-07-08T00:00:00Z',
            Median: 0,
            Notes: [],
            TeamName: 'flip',
          },
        ],
        Users: [],
      };

      const getTeamResponse = {
        data: existedTeam,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 200,
        statusText: 'OK',
      };

      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(getTeamResponse));
      jest.spyOn(httpService, 'put').mockImplementationOnce(() => of(httpResponse));
      await teamSpiritService.addUserToTeam(userDTO, teamName);
      expect(httpService.get).toBeCalledTimes(1);
      expect(httpService.put).toBeCalledTimes(1);
    });

    it(' should throw error if team is not already present', async () => {
      const TeamResponse: AxiosResponse<any> = {
        data: undefined,
        headers: {},
        config: { url: 'http://localhost:3000/team-Spirit' },
        status: 404,
        statusText: 'Not Found',
      };
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(TeamResponse));

      try {
        await teamSpiritService.addUserToTeam(userDTO, teamName);
      } catch (e) {
        expect(e).toMatch('Team ' + teamName + ' does not exist');
      }
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import {
//   SprintRepositoryMock,
//   TeamSpiritRepositoryMock,
// } from '../../../../../test/mockCrudRepository/crudRepository.mock';

// import { Sprint } from '../../sprint/model/entities/sprint.entity';
// import { Team } from '../../teams/model/entities/team.entity';

// import { TeamSpirit } from '../model/entities/team-spirit.entity';
// import { TeamSpiritCrudService } from './team-spirit.crud.service';

// describe('TeamSpiritCrudService', () => {
//   let service: TeamSpiritCrudService;
//   let teamSpiritRepo: TeamSpiritRepositoryMock;
//   let sprintRepo: SprintRepositoryMock;

// beforeEach(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//     providers: [
//       TeamSpiritCrudService,
// {
//   provide: getRepositoryToken(TeamSpirit),
//   useClass: TeamSpiritRepositoryMock,
// },
//       {
//         provide: getRepositoryToken(Sprint),
//         useClass: SprintRepositoryMock,
//       },
//     ],
//   }).compile();

// service = module.get<TeamSpiritCrudService>(TeamSpiritCrudService);
// teamSpiritRepo = module.get<TeamSpiritRepositoryMock>(getRepositoryToken(TeamSpirit));
// sprintRepo = module.get<SprintRepositoryMock>(getRepositoryToken(Sprint));
//   });

// it('should be defined after module initialization', () => {
//   expect(service).toBeDefined();
//   expect(teamSpiritRepo).toBeDefined();
//   expect(sprintRepo).toBeDefined();
// });

//   it('getTeamSpirit() method should return teamSpiritResponse', async () => {
//     const team1: Team = {
//       id: '46455bf7-ada7-495c-8019-8d7ab76d488e',
//       version: 1,
//       createdAt: '2021-03-12T17:36:31.141Z',
//       updatedAt: '2021-03-12T17:36:31.141Z',
//       name: 'Diamler Devops',
//       logo: 'uploads\\logo\\logo31ca9983-ae97-4bb0-9f22-4867d3cc16a0.png',
//       business_unit: {
//         id: '46655bf7-ada7-495c-8019-8d7ab62d488e',
//         version: 1,
//         createdAt: '2021-03-12T17:36:31.141Z',
//         updatedAt: '2021-03-12T17:36:31.141Z',
//         name: 'ADC Bangalore',
//         parent_id: '46555bf7-ada7-495c-8019-8d7ab62d488e',
//         root_parent_id: '11111bf1-ada1-111c-1111-1d1ab11d111e',
//       },
//     };
//     const sprint: Sprint = {
//       id: '20255bf8-ada5-495c-8019-8d7ab76d488e',
//       version: 1,
//       createdAt: '2021-03-22T08:39:31.870Z',
//       updatedAt: '2021-03-22T08:39:31.870Z',
//       sprint_number: 10,
//       start_date: '2021-02-10',
//       end_date: '2021-02-25',
//       status: '11155bf3-ada5-495c-8019-8d7ab76d488e',
//       team: team1,
//       work_unit: '11155bf2-ada5-495c-8019-8d7ab76d488e',
//     };

//     const teamSpirit: TeamSpirit = {
//       id: '20111bf8-ada5-495c-8019-8d7ab76d488e',
//       version: 1,
//       createdAt: '2021-03-22T08:39:31.870Z',
//       updatedAt: '2021-03-22T08:39:31.870Z',
//       team_spirit_rating: 8,
//       sprint: sprint,
//     };

//     const expectedTeamSpiritResponse = {
//       teamSpiritRating: 8,
//       sprintNumber: 10,
//     };

//     const createQueryBuilder1: any = {
//       limit: () => createQueryBuilder1,
//       where: () => createQueryBuilder1,
//       getOne: jest.fn().mockResolvedValue(teamSpirit),
//     };

// const createQueryBuilder2: any = {
//   limit: () => createQueryBuilder2,
//   groupBy: () => createQueryBuilder2,
//   where: () => createQueryBuilder2,
//   orderBy: () => createQueryBuilder2,
//   skip: () => createQueryBuilder2,
//   take: () => createQueryBuilder2,
//   getOne: jest.fn().mockResolvedValue(sprint),
// };

//     jest.spyOn(teamSpiritRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder1);
//     jest.spyOn(sprintRepo, 'createQueryBuilder').mockImplementation(() => createQueryBuilder2);
// const actualTeamSpirit = await service.getTeamSpirit(team1.id);
// expect(sprintRepo.createQueryBuilder).toBeCalledTimes(1);
// expect(teamSpiritRepo.createQueryBuilder).toBeCalledTimes(1);
// expect(actualTeamSpirit).toEqual(expectedTeamSpiritResponse);
//   });
// });
