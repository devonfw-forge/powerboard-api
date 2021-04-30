import { BadRequestException, Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/model/entities/user.entity';
import { AuthService } from '../services/auth.service';

import { GetUser } from '../decorators/get-user.decorator';
import { LoginDTO } from '../model/LoginDTO';

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
      const registered = await this.authService.register(user);
      return registered;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('currentuser')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User): User {
    return user;
  }
}
