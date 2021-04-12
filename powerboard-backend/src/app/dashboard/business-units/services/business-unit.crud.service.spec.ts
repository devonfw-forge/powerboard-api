import { TestingModule, Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BusinessUnitRepositoryMock } from '../../../../../test/mockCrudRepository/crudRepository.mock';
import { BusinessUnit } from '../model/entities/business-unit.entity';
import { BusinessUnitCrudService } from './business-unit.crud.service';

describe('BusinessUnitCrudService', () => {
  let service: BusinessUnitCrudService;
  let businessUnitRepo: BusinessUnitRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUnitCrudService,
        {
          provide: getRepositoryToken(BusinessUnit),
          useClass: BusinessUnitRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BusinessUnitCrudService>(BusinessUnitCrudService);
    businessUnitRepo = module.get<BusinessUnitRepositoryMock>(getRepositoryToken(BusinessUnit));
  });

  it('should be defined after module initialization', () => {
    expect(service).toBeDefined();
    expect(businessUnitRepo).toBeDefined();
  });
});
