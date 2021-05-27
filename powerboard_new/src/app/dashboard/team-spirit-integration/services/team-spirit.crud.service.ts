import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Sprint } from '../../sprint/model/entities/sprint.entity';
import { TeamSpiritResponse } from '../model/dto/TeamSpiritResponse';
import { TeamSpirit } from '../model/entities/team-spirit.entity';
//import { AxiosRequestConfig } from 'axios';
import { TeamSpiritDTO } from '../model/dto/TeamSpiritDTO';
// import btoa = require('btoa');
@Injectable()
export class TeamSpiritCrudService extends TypeOrmCrudService<TeamSpirit> {
  constructor(
    @InjectRepository(TeamSpirit) private readonly teamSpiritRepository: Repository<TeamSpirit>,
    @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>,
    private readonly http:HttpService
  ) {
    super(teamSpiritRepository);
  }
  teamSpiritResponse: TeamSpiritResponse = {} as TeamSpiritResponse;
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
   if(sprint==null){
     return undefined;
   }
   else{
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
 private newEndpointURL ='http://frparvm97723807.corp.capgemini.com:8981/';
// // API REST credentials
// private credentialsBase64 = btoa('TeamAPI' + ':' + 'TeamAPI2020!'); // TODO: Remove hardcoded for experimentation
// private config: AxiosRequestConfig = {
// headers: { Authorization: 'Basic' + this.credentialsBase64 },
// };

// // To get survey results
async getTeamSpiritFromProjectName(projectName: string): Promise<TeamSpirit> {
return this.http
  .get(this.newEndpointURL + `survey/result/`+projectName)
  .toPromise()
  .then(resp => {
    return resp.data;
  });
}
async addProjectToTeamSpirit(projectName:string): Promise<TeamSpiritDTO> {
  let projectDTO = new TeamSpiritDTO();
  projectDTO.projectName =projectName
  return this.http
    .post(this.newEndpointURL + `team/create`, projectDTO)
    .toPromise()
    .then(resp => {
      return resp.data;
    });
  }
  
//   // Update configuration of a group/user
//   async updateConfiguration(projectDto: TeamSpirit): Promise<TeamSpirit> {
//   return this.http
//     .post(this.newEndpointURL + `team/update`, projectDto, this.config)
//     .toPromise()
//     .then(resp => {
  
//       return resp.data;
//     });
//   }
// // // To get actual config
// // async getTeamSpiritConfigurationFromProjectName(
// // projectName: string,
// // ): Promise<TeamSpirit> {
// // return this._http
// //   .get(
// //     this.newEndpointURL + `/consult?groupName=${projectName}`,
// //   )
// //   .toPromise()
// //   .then(resp => {
// //     return resp.data;
// //   });
// // }

// // Add a new project to Team Spirit

// }

}