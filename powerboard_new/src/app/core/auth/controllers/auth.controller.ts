import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../user/model/entities/user.entity';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/get-user.decorator';
import { LoginDTO } from '../model/LoginDTO';
import { UserDTO } from '../../user/model/dto/UserDTO';
import { updateRoleDTO } from '../model/UpdateRoleDTO';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //Login the user
  @Post('login')
  async login(@Body() login: LoginDTO): Promise<any> {
    console.log(login);
    return await this.authService.login(login);
  }

  @Post('register')
  async register(@Body() user: UserDTO): Promise<User> {
    try {
      const registered = await this.authService.register(user);
      return registered;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
 
  //Delete user of particular team
  @Delete('delete/userTeam/:id')
  async deleteUserFromTeamById(@Param('id') userTeamId:string): Promise<any> {
    return await this.authService.deleteUserFromTeamById(userTeamId);
  }

  //View All Team member of team
  @Get('viewAllMemberOfTeam/:teamId')
  async getAllMemberOfTeam(@Param('teamId') teamId:string):Promise<any>{
    const result = await this.authService.getAllMemberOfTeam(teamId)
    console.log(result)
    return result;
  }

  //Updating the role of user by systema dmin
  @Put('update/accessRole')
  async updateUserRole(@Body() updateRoleDTO: updateRoleDTO):Promise<boolean>{
     return await this.authService.updateUserRole(updateRoleDTO);
  }

  @Get('currentuser')
  @UseGuards(AuthGuard())
  currentUser(@GetUser() user: User): User {
    return user;
  }
}
