import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CodeQualityResponse } from '../model/dto/CodeQualityResponse';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';

@Injectable()
export class CodeQualitySnapshotCrudService extends TypeOrmCrudService<CodeQualitySnapshot> {
  constructor(
    @InjectRepository(CodeQualitySnapshot) private readonly codeQualityRepository: Repository<CodeQualitySnapshot>,
  ) {
    super(codeQualityRepository);
  }
  codeQualityResponse: CodeQualityResponse ={} as CodeQualityResponse
  async getCodeQualitySnapshot(team_Id: number): Promise<CodeQualityResponse> {
    const result = await this.codeQualityRepository
      .createQueryBuilder('code_quality_snapshot')
      .where('code_quality_snapshot.team_id=:team_id', { team_id: team_Id })
      .orderBy('code_quality_snapshot.snapshot_time', 'DESC')
      .limit(1)
      .getOne();

    this.codeQualityResponse.bugs = result!.bugs;
    this.codeQualityResponse.debt = result!.debt;
    this.codeQualityResponse.codeCoverage = result!.code_coverage;
    this.codeQualityResponse.status = result!.status;

    return this.codeQualityResponse;
  }
}
