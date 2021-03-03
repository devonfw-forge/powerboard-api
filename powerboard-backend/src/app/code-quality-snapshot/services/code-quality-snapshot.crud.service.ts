import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CodeQualityDTO } from '../model/dto/CodeQualityDTO';
import { CodeQualitySnapshot } from '../model/entities/code-quality-snapshot.entity';


@Injectable()
export class CodeQualitySnapshotCrudService extends TypeOrmCrudService<CodeQualitySnapshot> {
  constructor(@InjectRepository(CodeQualitySnapshot) private readonly codeQualityRepository: Repository<CodeQualitySnapshot>) {
    super(codeQualityRepository);
  }
    qualityDTO :CodeQualityDTO = new CodeQualityDTO();
  async getCodeQualitySnapshot(id:number):Promise<CodeQualityDTO>{
   // const result = await this.codeQualityRepository.find({where :{teamId:id}}) 
   //const result =await this.codeQualityRepository.query(" SELECT * FROM code_quality_snapshot ORDER BY codeQualityTime DESC LIMIT 1 where teamId:"+id);
     const result = await this.codeQualityRepository.createQueryBuilder("code_quality_snapshot")
                                                     .where("code_quality_snapshot.teamId=:teamId" ,{teamId:id})
                                                     .orderBy("code_quality_snapshot.codeQualityTime","DESC")
                                                     .limit(1).getOne();
              
       this.qualityDTO.bugs = result!.bugs
     this.qualityDTO.debt= result!.debt;
     this.qualityDTO.codeCoverage = result!.codeCoverage;
     this.qualityDTO.status = result!.status;
   
     console.log(this.qualityDTO)
     return this.qualityDTO;



  }
}
