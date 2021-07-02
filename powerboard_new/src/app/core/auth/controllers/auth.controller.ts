import { Body, Controller, Get, Post, Put, UseGuards, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/model/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/get-user.decorator';
import { LoginDTO } from '../model/LoginDTO';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { AddGuestDTO } from '../../user/model/dto/AddGuestDTO';
import { Response as eResponse } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Login the user
  @Post('login')
  async login(@Body() login: LoginDTO): Promise<any> {
    console.log(login);
    return await this.authService.login(login);
  }

  //Add the user
  @Post('register')
  async register(@Body() user: UserDTO, @Response() res: eResponse): Promise<void> {
    const registered = await this.authService.register(user);
    if (registered) {
      res.status(201).send('Users successfully Registered');
    }
  }

  @Put('change-password')
  async changePassword(@Body() changePassword: ChangePasswordDTO): Promise<any> {
    return await this.authService.changePassword(changePassword);
  }

  //Add the user
  @Post('add-guest')
  async addGuestUser(@Body() guest: AddGuestDTO, @Response() res: eResponse): Promise<void> {
    const result = await this.authService.addGuest(guest);

    res.status(201).json(result);
  }

  @Get('currentuser')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User): User {
    return user;
  }
}
