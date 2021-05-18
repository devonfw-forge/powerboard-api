import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
// import { genSalt, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
// import { roles } from '../../auth/model/roles.enum';
// import { plainToClass } from 'class-transformer';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { roles } from '../../auth/model/roles.enum';
import { AddTeamUserDTO } from '../../auth/model/addTeamUserDTO';
import { genSalt, hash } from 'bcrypt';


@Injectable()
export class UserService extends TypeOrmCrudService<User> {
 
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
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

  // async registerUser(user: User): Promise<User> {
  //   const actualUser = await this.findUser(user.username!);

  //   if (actualUser) {
  //     throw new Error('User already exists');
  //   }

  //   const salt = await genSalt(12);
  //   const hashPass = await hash(user.password, salt);

  //   return plainToClass(
  //     User,
  //     await this.userRepository.save({
  //       username: user.username,
  //       password: hashPass,
  //       role: roles.USER,
  //     }),
  //   );
  // }
  async registerUser(user: User): Promise<User> {
    const actualUser = await this.findUser(user.username!);

    if (actualUser) {
      throw new Error('User already exists');
    }

    const salt = await genSalt(12);
    const hashPass = await hash(user.password, salt);
  
      const result =await this.userRepository.save({
        username: user.username,
        password: hashPass,
        role: roles.USER,
        teamId: user.teamId
      });
      console.log(result)
    return result;
  }

  async addTeamsToUser(addTeam: AddTeamUserDTO): Promise<any> {
    //let user = new User();
    const ExistingUser = await this.userRepository.findOne({ where: { username: addTeam.username } })as User;
      //addTeam.teamId.push(userExisting?.teamId[0]);
      let i
    
    if(ExistingUser){
      for(i=0; i<ExistingUser.teamId.length;i++)
      {
        addTeam.teamId.push(ExistingUser.teamId[i])
      }
  const result = await this.userRepository.save({
         id:ExistingUser.id,
         username: ExistingUser?.username,
         password:ExistingUser?.password,
         roles:ExistingUser?.role,
          teamId: addTeam.teamId
  })
  console.log(result)
}
else{
  console.log('bye')
}
  
  }
}
