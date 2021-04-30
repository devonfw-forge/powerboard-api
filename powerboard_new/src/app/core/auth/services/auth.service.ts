import { Injectable, UnauthorizedException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/model/entities/user.entity';
import { LoginDTO } from '../model/LoginDTO';

import { TeamCrudService } from '../../../dashboard/teams/services/team.crud.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly teamService: TeamCrudService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, pass: string): Promise<User | undefined> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && (await compare(pass, user.password!))) {
  //     return classToPlain(user) as User;
  //   }
  //   return undefined;
  // }
  async validateUser(username: string, pass: string): Promise<User | undefined> {
    const user = (await this.usersService.findOne({ where: { username: username } })) as User;
    if (user?.password == pass) {
      return classToPlain(user) as User;
    }
    return undefined;
  }
  async signIn(username: string, password: string): Promise<string> {
    const user: any = { username, password };
    const accessToken = this.jwtService.sign(user, { expiresIn: '1h' });
    return accessToken;
  }

  async login(user: LoginDTO): Promise<any> {
    const payload = await this.validateUser(user.username!, user.password!);

    if (payload) {
      const accessToken = await this.signIn(user.username, user.password);
      let userId = payload!.id;
      let flag = user.flag;
      if (flag) {
        const loginResponse = await this.teamService.getDashboardByUserId(userId);
        return { loginResponse, accessToken };
      } else {
        const electronResponse = await this.teamService.getElectronBoardByUserId(userId);
        return { electronResponse, accessToken };
      }
    } else {
      throw new UnauthorizedException('Wrong username or password');
    }
  }
  // async login(user: LoginDTO): Promise<string> {
  //   const payload = await this.validateUser(user.username!, user.password!);

  //   if (!payload) {
  //     throw new UnauthorizedException('Wrong username or password');
  //   }

  //   return this.jwtService.sign(payload);
  // }

  register(user: User): Promise<User> {
    return this.usersService.registerUser(user);
  }
}
