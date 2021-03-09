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
  qualityDTO: CodeQualityDTO = new CodeQualityDTO();
  async getCodeQualitySnapshot(team_Id: number): Promise<CodeQualityDTO> {
    const result = await this.codeQualityRepository
      .createQueryBuilder('code_quality_snapshot')
      .where('code_quality_snapshot.team_id=:team_id', { team_id: team_Id })
      .orderBy('code_quality_snapshot.snapshot_time', 'DESC')
      .limit(1)
      .getOne();

    this.qualityDTO.bugs = result!.bugs;
    this.qualityDTO.debt = result!.debt;
    this.qualityDTO.codeCoverage = result!.code_coverage;
    this.qualityDTO.status = result!.status;

    return this.qualityDTO;
  }
}
