import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/model/entities/user.entity';
import { LoginDTO } from '../model/LoginDTO';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { TeamCrudService } from '../../../teams/services/team.crud.service';
import { MyProject } from '../../user/model/dto/my_project.interface';
import { LoginResponse } from '../model/LoginResponse';
import { ADCenterCrudService } from '../../../dashboard/ad-center/services/ad-center.crud.service';
import { DashBoardResponse } from '../../../teams/model/dto/DashBoardResponse';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { AddGuestDTO } from '../../user/model/dto/AddGuestDTO';
import { UserTeam } from '../../user/model/entities/user_team.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly teamService: TeamCrudService,
    private readonly centerService: ADCenterCrudService,
    private jwtService: JwtService,
  ) {}
  dash: DashBoardResponse = {} as DashBoardResponse;
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
   * login method response is dynamic  , it will return LoginResponse
   * 1-n , it will return list of teams
   * @param {LoginDTO} .Takes loginDTO as input (username and password)
   * @return {any}
   */

  async login(user: LoginDTO): Promise<any> {
    const payload = await this.validateUser(user.username!, user.password!);
    if (payload) {
      const accessToken = await this.signIn(user.username, user.password);
      const userTeam = await this.userService.findUserTeamsByUserId(payload.id);
      if (userTeam[0].team == null) {
        return this.systemAndGuestLogin(userTeam[0], accessToken);
      } else {
        return this.teamMemberTeamAdminLogin(userTeam, accessToken, payload);
      }
    } else {
      throw new UnauthorizedException('Wrong username or password, Please try again');
    }
  }

  /**
   * systemAndGuestLogin method will return LoginResponse for system and guest login
   */
  async systemAndGuestLogin(userTeam: UserTeam, accessToken: string) {
    let loginResponse: LoginResponse = {} as LoginResponse;
    loginResponse.userId = userTeam.user.id;
    loginResponse.isPasswordChanged = userTeam.user.isPasswordChanged;
    loginResponse.My_Center = undefined;
    loginResponse.My_Team = [];
    loginResponse.ADC_List = await this.centerService.getAllCenters();
    loginResponse.Teams_In_ADC = await this.teamService.getTeamsByCenterId(loginResponse.ADC_List[0].centerId);
    loginResponse.privileges = await this.userService.getAllPrivileges(userTeam.user.id);
    return { loginResponse, accessToken };
  }

  /**
   * teamMemberTeamAdminLogin method will return LoginResponse for team member and team admin login
   */
  async teamMemberTeamAdminLogin(userTeam: UserTeam[], accessToken: string, payload: User) {
    let teamsDTOArray = [],
      i;
    if (userTeam.length >= 1) {
      let teamsWithinUser: MyProject = {} as MyProject;
      for (i = 0; i < userTeam.length; i++) {
        teamsWithinUser.teamId = userTeam[i].team.id;
        teamsWithinUser.teamName = userTeam[i].team.name;
        teamsWithinUser.myRole = userTeam[i].role.roleName;
        this.dash = (await this.teamService.getDashboardByTeamId(userTeam[i].team.id)) as DashBoardResponse;
        teamsWithinUser.teamStatus = this.teamService.fetchStatus(this.dash);
        teamsDTOArray.push(teamsWithinUser);
        teamsWithinUser = {} as MyProject;
      }
      let teamId = teamsDTOArray[0].teamId;
      const loginResponse = await this.loginDetailsForTeamMemberAdmin(teamId, teamsDTOArray, payload);
      return { loginResponse, accessToken };
    }
  }
  /**
   * loginDetailsForTeamMemberAdmin method will return LoginResponse for team member and team admin login
   */
  async loginDetailsForTeamMemberAdmin(teamId: string, teamsDTOArray: MyProject[], payload: User) {
    let loginResponse: LoginResponse = {} as LoginResponse;
    loginResponse.userId = payload.id;
    loginResponse.isPasswordChanged = payload.isPasswordChanged;
    loginResponse.My_Center = await this.teamService.myCenter(teamId);
    loginResponse.My_Team = teamsDTOArray;
    loginResponse.Teams_In_ADC = await this.teamService.viewTeamsInADC(teamId);
    loginResponse.ADC_List = await this.centerService.getAllCenters();
    loginResponse.privileges = [];
    return loginResponse;
  }

  /**
   * register method will add the user except guest user
   */
  register(user: UserDTO): Promise<User> {
    return this.userService.registerUser(user);
  }

  /**
   * addGuest method will add the guest in powerboard
   */
  addGuest(guest: AddGuestDTO): Promise<User> {
    return this.userService.addGuest(guest);
  }
  async changePassword(changePassword: ChangePasswordDTO): Promise<any> {
    return await this.userService.changePassword(changePassword);
  }
}
