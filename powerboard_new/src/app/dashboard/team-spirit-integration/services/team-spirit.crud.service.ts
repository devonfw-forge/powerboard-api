import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
import { AxiosRequestConfig } from 'axios';
import { TeamDTO } from '../model/dto/TeamDTO';
import { TeamSpiritUserDTO } from '../model/dto/TeamSpiritUserDTO';
import { Team } from '../../../teams/model/entities/team.entity';

//const querystring = require('querystring');

//import btoa = require('btoa');
@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(
    @InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>,
    @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>,
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
  async getTeamSpirit(team_Id: string): Promise<TeamSpiritResponse | undefined> {
    const sprint = (await this.sprintRepository
      .createQueryBuilder('sprint')
      .where('sprint.team_id=:team_id', { team_id: team_Id })
      .orderBy('sprint.sprint_number', 'DESC')
      .skip(1)
      .take(1)
      .getOne()) as Sprint;
    if (sprint == null) {
      return undefined;
    } else {
      const teamSpirit = (await this.teamSpiritRepository
        .createQueryBuilder('team_spirit')
        .where('team_spirit.sprint_id=:sprint_id', { sprint_id: sprint.id })
        .limit(1)
        .getOne()) as TeamSpirit;
      if (teamSpirit == null) {
        return undefined;
      } else {
        this.teamSpiritResponse.teamSpiritRating = teamSpirit.team_spirit_rating;
        this.teamSpiritResponse.sprintNumber = sprint.sprint_number;
        return this.teamSpiritResponse;
      }
    }
  }
  // API REST url
  private newTeamSpiritEndpointURL = 'http://frparvm97723807.corp.capgemini.com:8981/';

  // private credentialsBase64 = btoa('adcvlc@capgemini.com' + ':' + 'TeamSpiritADC1!'); // TODO: Remove hardcoded for experimentation

  // private credentialsBase64 = btoa('adcvlc@capgemini.com' + ':' + 'TeamSpiritADC1!'); // TODO: Remove hardcoded for experimentation
  // private config: AxiosRequestConfig = {
  //   headers: { Authorization: 'Basic' + this.credentialsBase64 },
  // };
  private config: AxiosRequestConfig = {
    headers: { Authorization: '' },
  };
  // private credentialsBase64 = btoa('adcvlc@capgemini.com' + ':' + 'TeamSpiritADC1!'); // TODO: Remove hardcoded for experimentation
  // private credentialsBase64 = btoa('adcvlc@capgemini.com' + ':' + 'TeamSpiritADC1!'); // TODO: Remove hardcoded for experimentation
  // private config: AxiosRequestConfig = {
  //   headers: { Authorization: 'Basic' + this.credentialsBase64 },
  // };
  // private config: AxiosRequestConfig = {
  //   headers: { Authorization: '' }
  // };

  // config: AxiosRequestConfig = {
  //   headers: { Authorization: this.accessTokenForTeamSpirit }
  // }
  // private configAxios: AxiosRequestConfig = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': this.accessTokenForTeamSpirit,
  //   }
  // };

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
  // async loginToTeamSpirit(teamSpiritUserDTO: TeamSpiritUserDTO): Promise<any> {
  //   console.log(teamSpiritUserDTO.Email + " " + teamSpiritUserDTO.Password);
  //   console.log('Inside Login of Team Spirit');
  //   this.accessTokenForTeamSpirit = await this.http.post(this.newTeamSpiritEndpointURL + 'login', teamSpiritUserDTO).toPromise()
  //     .then(resp => {
  //       console.log("This is the token in then  " + resp.data.token);
  //       return resp.data;
  //     });
  //   this.setAxiosToken(this.accessTokenForTeamSpirit);
  //   console.log('Set Axios Token')
  //   console.log(this.setAxiosToken);
  //   return this.accessTokenForTeamSpirit;
  // }

  // headers: any = {
  //   'Content-type': 'application/json',
  //   'Authorization': 'Bearer ' + this.accessTokenForTeamSpirit
  // }

  setAxiosToken = (token: any) => {
    this.config.headers.Authorization = `Bearer ${token}`;
    console.log('Setting the token');
    console.log(this.accessTokenForTeamSpirit);
    console.log(token);
  };

  checkingConfig() {
    console.log('Config Object');
    console.log(this.config);
    console.log(this.config.headers.Authorization);
    return this.config;
  }

  //To get the result of team's survey
  async getTeamSpiritFromSurvey(projectName: string): Promise<any> {
    console.log('Inside GETTEAMSPIRIT');
    console.log('Config iside getTeamSpiritFromSurvey');
    //const surveyResult = await this.http.get(this.newTeamSpiritEndpointURL + 'survey/result' + projectName, { headers: { "Authorization": 'Bearer' + this.config.headers.Authorization } })
    //const surveyResult = await this.http.get(this.newTeamSpiritEndpointURL + 'survey/result/' + projectName, this.config)
    // const surveyResult = await this.http.get(this.newTeamSpiritEndpointURL + 'survey/result/' + projectName,
    //   {
    //     headers: {
    //       // 'Content-type': 'application/json',
    //       Authorization: 'Bearer ' + this.accessTokenForTeamSpirit
    //     }
    //   })
    const surveyResult = await this.http
      .get(this.newTeamSpiritEndpointURL + 'survey/result/' + projectName, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      .toPromise()
      .then(resp => {
        return resp.data;
      });
    console.log(surveyResult);
    return surveyResult;
  }

  //add a team to the team spirit
  async addTeamToTeamSpirit(team: TeamDTO): Promise<any> {
    const teamExisted = await this.getTeam(team.name);
    if (teamExisted) {
      return 'Team ' + team.name + ' already exists';
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
  async updateTeamSpiritConfiguration(newGroup: TeamDTO, projectName: string): Promise<any> {
    // const team = this.http.get(this.newTeamSpiritEndpointURL + 'team/' + projectName, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token } })
    //   .toPromise()
    //   .then(resp => { return resp.data });
    // if (!team) {
    //   return "Team " + projectName + " does not exist."
    // }
    //else {
    newGroup.name = projectName;
    console.log(this.config.headers.Authorization.token);
    return await this.http
      .put(this.newTeamSpiritEndpointURL + 'team/' + projectName, newGroup, {
        headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
      })
      //return this.http.put(this.newTeamSpiritEndpointURL + 'team/' + projectName, teamDTO, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization } })
      .toPromise()
      .then(resp => {
        console.log(resp.data);
        return resp.data;
      });
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

  async addUserToTeam(userDTO: TeamSpiritUserDTO, teamName: string) {
    // const team= await this.http.get(this.newTeamSpiritEndpointURL + 'team/' + teamName, { headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token } })
    // .toPromise()
    // .then(resp => {
    //   return resp.data;
    // })
    // .catch(error => {
    //   return error.response;
    // })
    let teamDTO = new TeamDTO();
    teamDTO.users!.push(userDTO);
    return await this.http.put(this.newTeamSpiritEndpointURL + 'team/' + teamName, teamDTO, {
      headers: { Authorization: 'Bearer ' + this.config.headers.Authorization.token },
    });
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
}
