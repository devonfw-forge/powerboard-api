import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { roles } from '../../auth/model/roles.enum';
import { genSalt, hash } from 'bcrypt';
import { UserTeam } from '../model/entities/user_team.entity';
import { UserDTO } from '../model/dto/UserDTO';


@Injectable()
export class UserService extends TypeOrmCrudService<User> {
 
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
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
    console.log(hashPass)
     let user   = new User()
      user.username = userDTO.username;
      user.password = hashPass;
      user.email = userDTO.email;
      user.role = roles.USER;
       const result =await this.userRepository.save(user);
      
      if(result){
         let userTeam = new UserTeam();
         userTeam.user = result;
         userTeam.team = userDTO.teamId[0];
         console.log(userTeam.team.id);
         userTeam.accessRole = userDTO.accessRole;
         const output =await this.userTeamRepository.save(userTeam);
         console.log(output)
      }
    
      console.log(result)
    return result;
  }


   /**
   * addTeamsToUser method will add user to other teams 
   * @param {User, UserDTO} .Takes as input
   * @return {UserTeam} UserTeam as response
   */
  async addTeamsToUser(actualUser:User|undefined ,userDTO:UserDTO):Promise<any>{
    let userTeam = new UserTeam();
    userTeam.team = userDTO.teamId[0];
    userTeam.accessRole = userDTO.accessRole;
    userTeam.user = actualUser!
    const output =await this.userTeamRepository.save(userTeam);
    return output;
  }
  
  
}
