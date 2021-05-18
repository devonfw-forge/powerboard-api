import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/model/entities/user.entity';
import { AuthService } from '../services/auth.service';

import { GetUser } from '../decorators/get-user.decorator';
import { LoginDTO } from '../model/LoginDTO';
import { AddTeamUserDTO } from '../model/addTeamUserDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  // @Post('login')
  // @HttpCode(200)
  // async login(@Body() login: LoginDTO, @Response() res: eResponse): Promise<void> {
  //   const token = await this.authService.login(login);
  //   res.setHeader('Authorization', 'Bearer ' + token);
  //   res.status(200).send();
  // }

  @Post('login')
  async login(@Body() login: LoginDTO): Promise<any> {
    console.log(login);
    return await this.authService.login(login);
  }

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    try {
      console.log('controller');
      console.log(user);
      const registered = await this.authService.register(user);
      console.log('resultttttttttt');
      console.log(registered);

      return registered;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  //Adding more teams to one particular user
  @Post('addTeamsToUser')
  async addMoreTeamForUser(@Body() addTeam: AddTeamUserDTO): Promise<any> {
    
    return  await this.authService.addTeamsToUser(addTeam); 
  }

  

  @Get('currentuser')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User): User {
    return user;
  }
}
