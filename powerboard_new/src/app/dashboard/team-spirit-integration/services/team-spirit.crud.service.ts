import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse';
import { AxiosRequestConfig } from 'axios';
import { TeamDTO } from '../model/dto/TeamDTO';
import { TeamSpiritUserDTO } from '../model/dto/TeamSpiritUserDTO';
import { Team } from '../../../teams/model/entities/team.entity';
import { TeamSpiritMedian } from '../model/entities/team-spirit-median.entity';
//import { TeamSpiritMedian } from '../model/entities/team-spirit-median.entity';

@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpiritMedian> {
  constructor(
    @InjectRepository(TeamSpiritMedian) private readonly teamSpiritRepository: Repository<TeamSpiritMedian>,
    @InjectRepository(Team) private readonly teamRepository: Repository<Team>,
    private readonly http: HttpService,
  ) {
    super(teamSpiritRepository);
  }
  teamSpiritResponse: TeamSpiritResponse = {} as TeamSpiritResponse;
  accessTokenForTeamSpirit = '';
  /**
   * getTeamSpirit method will fetch the spirit of team
   * @param {teamId} ,Takes teamId as input
   * @return {TeamSpiritResponse} TeamSpirit as response for that team's previous sprint
   */

  // API REST url
  private newTeamSpiritEndpointURL = 'http://frparvm97723807.corp.capgemini.com:8981/';

  private config: AxiosRequestConfig = {
    headers: { Authorization: '' },
  };

  async loginToTeamSpirit(teamSpiritUserDTO: TeamSpiritUserDTO): Promise<any> {
    console.log(teamSpiritUserDTO.Email + ' ' + teamSpiritUserDTO.Password);
    console.log('Inside Login of Team Spirit');
    this.config.headers.Authorization = await this.http
      .post(this.newTeamSpiritEndpointURL + 'login', teamSpiritUserDTO)
      .toPromise()
      .then(resp => {
        console.log('This is the token in then  ' + resp.data.token);
        return resp.data;
      });
    console.log('This is config ' + this.config);
    console.log('This is headers Authorization' + this.config.headers.Authorization);
    return this.config.headers.Authorization;
  }

  checkingConfig() {
    console.log('Config Object');
    console.log(this.config);
    console.log(this.config.headers.Authorization);
    return this.config;
  }

  async getTeam(teamName: string): Promise<any> {
    return await this.http
      .get(this.newTeamSpiritEndpointURL + 'team/' + teamName, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
  }

  //To get the result of team's survey
  async getTeamSpiritFromSurvey(teamName: string): Promise<any> {
    console.log('Inside GETTEAMSPIRIT');
    console.log('Config iside getTeamSpiritFromSurvey');
    const surveyResult = (await this.teamSpiritRepository
      .createQueryBuilder('team_spirit_median')
      .where('team_spirit_median.team_name=:team_name', { team_name: teamName })
      .orderBy('team_spirit_median.start_date', 'DESC')
      .limit(1)
      .getOne()) as TeamSpiritMedian;
    console.log('This is surveyMedian from DB');
    console.log(surveyResult);

    return surveyResult.surveyMedian;
  }

  // const surveyResult = await this.http
  //   .get(this.newTeamSpiritEndpointURL + 'survey/result/' + projectName, {
  //     headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
  //   })
  //   .toPromise()
  //   .then(resp => {
  //     return resp.data;
  //   });

  //add a team to the team spirit
  async addTeamToTeamSpirit(team: TeamDTO): Promise<any> {
    const teamExisted = await this.getTeam(team.Name);
    if (teamExisted) {
      return 'Team ' + team.Name + ' already exists';
    } else {
      const createdTeam = await this.http
        .post(this.newTeamSpiritEndpointURL + 'team/create', team, {
          headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
        })
        .toPromise()
        .then(resp => {
          console.log(resp.data);
          return resp.data;
        });
      // .catch(error => {
      //   console.log(error.response.data);
      //   return error.response.data;
      // });
      return createdTeam;
    }
  }

  //update configuration of a team
  async updateTeamConfiguration(updatedTeam: TeamDTO, teamName: string): Promise<any> {
    const team: TeamDTO = await this.getTeam(teamName);
    if (!team) {
      return 'Team ' + teamName + ' does not exist.';
    } else {
      console.log(this.config.headers.Authorization.token);

      team.Name = teamName;
      team.Frequency = updatedTeam.Frequency;
      team.Num_mumbers = updatedTeam.Num_mumbers;
      team.StartDate = updatedTeam.StartDate;

      console.log('Updated team****************');
      console.log(team);
      return await this.http
        .put(this.newTeamSpiritEndpointURL + 'team/' + teamName, team, {
          headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
        })
        //return this.http.put(this.newTeamSpiritEndpointURL + 'team/' + projectName, teamDTO, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization } })
        .toPromise()
        .then(resp => {
          console.log(resp.data);
          return resp.data;
        });
    }
  }

  async createUser(userDTO: TeamSpiritUserDTO): Promise<any> {
    return await this.http
      .post(this.newTeamSpiritEndpointURL + 'user/create', userDTO, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
  }

  async addUserToTeam(userDTO: TeamSpiritUserDTO, teamName: string): Promise<any> {
    userDTO.RoleID = 2;
    userDTO.Role = {
      Id: 2,
      Name: 'Team Leader',
    };
    const user = {
      RoleID: userDTO.RoleID,
      Full_Name: userDTO.Full_Name,
      Email: userDTO.Email,
      Password: userDTO.Password,
      Role: userDTO.Role,
    };
    const team = await this.getTeam(teamName);
    team.Users.push(user);

    const updatedTeam = await this.http
      .put(this.newTeamSpiritEndpointURL + 'team/' + teamName, team, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
    return updatedTeam;
  }

  async registerUser(userDTO: TeamSpiritUserDTO) {
    return await this.http
      .post(this.newTeamSpiritEndpointURL + 'register', userDTO, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
  }

  async getAllSurveyResult(): Promise<any> {
    const allTeams = await this.teamRepository.find();
    console.log('All the teams present in the Powerboard');
    console.log(allTeams);
    // let i;
    // for (i = 0; i <= allTeams.length; i++) {
    //   const teamsSurveyMedian = await this.http.get(this.newTeamSpiritEndpointURL + 'survey/result' + allTeams[i].name, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token } })
    //     .toPromise()
    //     .then(resp => {
    //       return resp.data;
    //     })
    //   console.log(teamsSurveyMedian);
    // let  TeamSurveyMedian =new TeamSurveyMedianDTO();
    // TeamSurveyMedian.teamName=teamsSurveyMedian[i].name;
    // TeamSurveyMedian.median=teamsSurveyMedian[i].median;
    // TeamSurveyMedian.startDate=teamsSurveyMedian[i].startDate;
    // TeamSurveyMedian.endDate=teamsSurveyMedian[i].endDate;
    //  return await this.teamSurveyMedianRepository.save(TeamSurveyMedian);
    //}
    const allSurveyResult = await this.http
      .get(this.newTeamSpiritEndpointURL + 'survies', {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });

    //console.log(allSurveyResult);
    return allSurveyResult;
  }

  async getAllTeams(): Promise<any> {
    const allTeams = await this.http
      .get(this.newTeamSpiritEndpointURL + 'teams', {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
    return allTeams;
  }

  async getAllUsers(): Promise<any> {
    const allUsers = await this.http
      .get(this.newTeamSpiritEndpointURL + 'users', {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
    return allUsers;
  }
}
