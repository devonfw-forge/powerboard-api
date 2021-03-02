import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../model/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findOne(id:number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

 
}
