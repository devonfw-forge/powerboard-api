import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/model/entities/user.entity';
import { LoginDTO } from '../model/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { UserTeamResponse } from '../../user/model/dto/UserTeamResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamCrudService,
    private jwtService: JwtService,
  ) {}

  /**
   * validateUser method will validate User
   * @param {username, password} .Takes as input (username and password)
   * @return {User} User as response
   */
  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = (await this.userService.findOne({ where: { username: username } })) as User;
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
      const userTeam = await this.userService.findUserTeamsByUserId(payload.id);
      // const userTeam = await this.userTeamRepository.find({ where: { user: payload.id } });
      console.log('hdshdjhdjdhsjhdjhdjhdjhdjshjhdjhdhsdhdhjhshdjshjdhd');
      console.log(userTeam);

      let teamId;
      let teamsDTOArray = [],
        i;
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
      } else if (userTeam.length == 0) {
        let user = new User();
        user.id = payload.id;
        user.email = payload.email;
        return user;
      } else {
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
    return this.userService.registerUser(user);
  }
}
