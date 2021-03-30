import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';

import { User } from '../model/entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repo: UserRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: UserRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<UserRepositoryMock>(getRepositoryToken(User));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });
});
