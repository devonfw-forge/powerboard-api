import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { roles } from '../../auth/model/roles.enum';
import { genSalt, hash } from 'bcrypt';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserDTO } from '../model/dto/UserDTO';
import { TeamsMemberResponse } from '../../../shared/interfaces/teamMemberResponse';
import { UpdateRole } from 'src/app/shared/interfaces/updateRole.interface';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserTeam) private readonly userTeamRepository: Repository<UserTeam>,
  ) {
    super(userRepository);
  }

  async findUser(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  /**
   * registerUser method will register the user as well as add user to other team also
   * @param {UserDTO} .Takes as input
   * @return {User} created User as response
   */
  async registerUser(userDTO: UserDTO): Promise<User> {
    const actualUser = await this.findUser(userDTO.username);
    if (actualUser) {
      return this.addTeamsToUser(actualUser, userDTO);
    }
    const salt = await genSalt(12);
    const hashPass = await hash(userDTO.password, salt);
    console.log(hashPass);
    let user = new User();
    user.username = userDTO.username;
    user.password = hashPass;
    user.email = userDTO.email;
    user.role = roles.USER;
    const result = await this.userRepository.save(user);

    if (result) {
      let userTeam = new UserTeam();
      userTeam.user = result;
      userTeam.team = userDTO.teamId[0];
      console.log(userTeam.team.id);
      userTeam.accessRole = userDTO.accessRole;
      const output = await this.userTeamRepository.save(userTeam);
      console.log(output);
    }

    console.log(result);
    return result;
  }

  /**
   * addTeamsToUser method will add user to other teams
   * @param {User, UserDTO} .Takes as input
   * @return {UserTeam} UserTeam as response
   */
  async addTeamsToUser(actualUser: User | undefined, userDTO: UserDTO): Promise<any> {
    let userTeam = new UserTeam();
    userTeam.team = userDTO.teamId[0];
    userTeam.accessRole = userDTO.accessRole;
    userTeam.user = actualUser!;
    const output = await this.userTeamRepository.save(userTeam);
    return output;
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
    const result = (await this.userTeamRepository.find({ where: { team: teamId } })) as UserTeam[];
    let teamsMemberResponse: TeamsMemberResponse = {} as TeamsMemberResponse;
    let teamMemberList = [],
      i;
    for (i = 0; i < result.length; i++) {
      teamsMemberResponse.userTeamId = result[i].id;
      teamsMemberResponse.userName = result[i].user.username;
      teamsMemberResponse.email = result[i].user.email;
      teamsMemberResponse.accessRole = result[i].accessRole;
      teamMemberList.push(teamsMemberResponse);

      teamsMemberResponse = {} as TeamsMemberResponse;
    }
    return teamMemberList;
  }

  async updateUserRole(updateRoleDTO: UpdateRole): Promise<boolean> {
    let result = (await this.userTeamRepository.findOne({ where: { id: updateRoleDTO.userTeamId } })) as UserTeam;
    let userTeam = new UserTeam();
    let output: boolean;
    if (result) {
      userTeam.id = result.id;
      userTeam.accessRole = updateRoleDTO.accessRole;
      const exist = await this.userTeamRepository.save(userTeam);
      if (exist) {
        output = true;
      } else {
        output = false;
      }
    } else {
      console.log('no team found for that user in Userteam');
      output = false;
    }
    return output;
  }

  findUserTeamsByUserId(id: string) {
    return this.userTeamRepository.find({ where: { user: id } });
  }
}
