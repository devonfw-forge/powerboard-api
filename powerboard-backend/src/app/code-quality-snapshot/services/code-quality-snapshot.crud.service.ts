import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CodeQualityDTO } from '../model/dto/CodeQualityDTO';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';

@Injectable()
export class CodeQualitySnapshotCrudService extends TypeOrmCrudService<CodeQualitySnapshot> {
  constructor(
    @InjectRepository(CodeQualitySnapshot) private readonly codeQualityRepository: Repository<CodeQualitySnapshot>,
  ) {
    super(codeQualityRepository);
  }
  codequalityDTO: CodeQualityDTO = new CodeQualityDTO();
  async getCodeQualitySnapshot(id: number): Promise<CodeQualityDTO> {
    const codeQualityResult = await this.codeQualityRepository.find({ where: { teamId: id } });
    console.log(codeQualityResult);
    this.codequalityDTO.bugs = codeQualityResult[0].bugs;
    this.codequalityDTO.debt = codeQualityResult[0].debt;
    this.codequalityDTO.codeCoverage = codeQualityResult[0].codeCoverage;
    this.codequalityDTO.status = codeQualityResult[0].status;
    console.log(this.codequalityDTO);
    return this.codequalityDTO;
  }
}
