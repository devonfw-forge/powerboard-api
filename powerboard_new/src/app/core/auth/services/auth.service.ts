import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/model/entities/user.entity';
import { LoginDTO } from '../model/LoginDTO';

//import { TeamCrudService } from '../../../dashboard/teams/services/team.crud.service';
import { JwtService } from '@nestjs/jwt';

import { compare } from 'bcrypt';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { UserTeam } from '../../user/model/entities/user_team.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamCrudService } from '../../../dashboard/teams/services/team.crud.service';
import { UserTeamResponse } from '../../user/model/dto/UserTeamResponse';
import { TeamsMemberResponse } from '../model/TeamsMemberResponse';
import { updateRoleDTO } from '../model/UpdateRoleDTO';

@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(UserTeam) private readonly userTeamRepository: Repository<UserTeam>,
    private readonly usersService: UserService,
    private readonly teamService: TeamCrudService,
    private jwtService: JwtService,
  ) {}

  /**
   * validateUser method will validate User
   * @param {username, password} .Takes as input (username and password)
   * @return {User} User as response
   */
  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = (await this.usersService.findOne({ where: { username: username } })) as User;
    // if (user?.password == pass) {
    if (user && (await compare(pass, user.password!))) {
      return classToPlain(user) as User;
    }
    return undefined;
  }

  /**
   * signIn method will generate accessToken
   * @param {username, password} .Takes as input (username and password)
   * @return {string} AccessToken as response
   */
  async signIn(username: string, password: string): Promise<string> {
    const user: any = { username, password };
    const accessToken = this.jwtService.sign(user, { expiresIn: '1h' });
    return accessToken;
  }


  /**
   * login method response is dynamic , means one 1 user -1 team , it will return LoginResponse
   * 1-n , it will return list of teams
   * @param {LoginDTO} .Takes loginDTO as input (username and password)
   * @return {any} 
   */
  async login(user: LoginDTO): Promise<any> {
    const payload = await this.validateUser(user.username!, user.password!);
    console.log(payload);
    if (payload) {
      const accessToken = await this.signIn(user.username, user.password);
      console.log(accessToken);
      const userTeam = await this.userTeamRepository.find({ where: { user: payload.id } });
      console.log(userTeam);
      let teamId;
      let teamsDTOArray = [],i;
      if (userTeam.length > 1) {
        let teamsWithinUser: UserTeamResponse = {} as UserTeamResponse;
      
        for (i = 0; i < userTeam.length; i++) {
          teamsWithinUser.teamId = userTeam[i].team.id;
          teamsWithinUser.teamName = userTeam[i].team.name;
          teamsWithinUser.accessRole = userTeam[i].accessRole;

          teamsDTOArray.push(teamsWithinUser);
          teamsWithinUser = {} as UserTeamResponse;
        }
        return teamsDTOArray;
      } 
      else if(userTeam.length==0)
      {
          let user = new User();
          user.id = payload.id;
          user.email = payload.email;
          return user;
      }else {
        teamId = userTeam[0].team.id;
        const loginResponse = await this.teamService.getPowerboardByTeamId(teamId);
        return { loginResponse, accessToken };
      }
    } else {
      throw new UnauthorizedException('Wrong username or password');
    }
  }
 


//Further call to UserService
  register(user: UserDTO): Promise<User> {
    return this.usersService.registerUser(user);
  }
 

  /**
   * deleteUserFromTeamById method will delete user , and system admin can do so
   * @param {userteamId} .Takes userTeamId as input
   * @return {void} 
   */
  async deleteUserFromTeamById(id: string): Promise<any> {
    return await this.userTeamRepository.delete(id);
  }



   /**
   * getAllMemberOfTeam method will fetch all user of team , and system admin can do so
   * @param {teamId} .Takes teamId as input
   * @return {TeamsMemberResponse[]} .Return array of team member as response
   */
  async getAllMemberOfTeam(teamId: any) {
    const result  = await this.userTeamRepository.find({where :{team:teamId}}) as UserTeam[]
    let teamsMemberResponse: TeamsMemberResponse = {} as TeamsMemberResponse;
    let teamMemberList = [], i;
    for (i = 0; i < result.length; i++) {
      teamsMemberResponse.userTeamId= result[i].id;
      teamsMemberResponse.userName = result[i].user.username;
      teamsMemberResponse.email = result[i].user.email;
      teamsMemberResponse.accessRole = result[i].accessRole;
      teamMemberList.push(teamsMemberResponse)
      
      teamsMemberResponse = {} as TeamsMemberResponse
    }
    return teamMemberList;
  }


  async updateUserRole(updateRoleDTO: updateRoleDTO): Promise<boolean> {
    let result = await this.userTeamRepository.findOne({where :{id:updateRoleDTO.userTeamId}}) as UserTeam;
    let userTeam = new UserTeam();
    let output:boolean
    if(result)
      {
        userTeam.id = result.id;
        userTeam.accessRole = updateRoleDTO.accessRole;
        const exist =  await this.userTeamRepository.save(userTeam);
        if(exist){
          output= true;
        }
        else{
          output= false;
        }
      }
     
   else{
     console.log('no team found for that user in Userteam')
     output= false;
   }
   return output
  }

}

