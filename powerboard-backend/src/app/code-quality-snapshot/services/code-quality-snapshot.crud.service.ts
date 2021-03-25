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
  /**
   * getCodeQuality method will fetch the quality of code
   * @param {teamId} .Takes teamId as input
   * @return {CodeQualityResponse} Code Quality as response for that team
   */
  codeQualityResponse: CodeQualityResponse = {} as CodeQualityResponse;
  async getCodeQualitySnapshot(team_Id: number): Promise<CodeQualityResponse> {
    //   const result = await this.codeQualityRepository
    //     .createQueryBuilder('code_quality_snapshot')
    //     .where('code_quality_snapshot.team_id=:team_id', { team_id: team_Id })
    //     .orderBy('code_quality_snapshot.snapshot_time', 'DESC')
    //     .limit(1)
    //     .getOne() as CodeQualitySnapshot;
    //   console.log(result)

    const result = (await this.codeQualityRepository.find({
      where: { team: team_Id },
      order: { snapshot_time: 'DESC' },
      take: 1,
    })) as CodeQualitySnapshot[];

    console.log(result);

    this.codeQualityResponse.bugs = result[0].bugs;
    this.codeQualityResponse.debt = result[0].debt;
    this.codeQualityResponse.codeCoverage = result[0].code_coverage;
    this.codeQualityResponse.status = result[0].status;
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    console.log(result[0].bugs);
    return this.codeQualityResponse;
  }
}
