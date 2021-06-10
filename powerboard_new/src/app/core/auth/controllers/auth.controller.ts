import { BadRequestException, Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/model/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/get-user.decorator';
import { LoginDTO } from '../model/LoginDTO';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { ChangePasswordDTO } from '../model/ChangePasswordDTO';
import { AddGuestDTO } from '../../user/model/dto/AddGuestDTO';

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
  async register(@Body() user: UserDTO): Promise<User> {
    try {
      const registered = await this.authService.register(user);
      return registered;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Put('change-password')
  async changePassword(@Body() changePassword:ChangePasswordDTO):Promise<any>{
    return await this.authService.changePassword(changePassword);
  }

   //Add the user
   @Post('add-guest')
   async addGuestUser(@Body() guest: AddGuestDTO): Promise<User> {
     try {
       const added = await this.authService.addGuest(guest);
       return added;
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
