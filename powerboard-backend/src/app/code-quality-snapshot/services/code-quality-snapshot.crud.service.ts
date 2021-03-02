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
    const result = await this.codeQualityRepository.find({where :{teamId:id}}) 
    console.log(result);
     this.qualityDTO.bugs = result[0].bugs;
     this.qualityDTO.debt= result[0].debt;
     this.qualityDTO.codeCoverage = result[0].codeCoverage;
     this.qualityDTO.status = result[0].status;
     console.log('Heloooooooooooooooooooo Evrryyyyyyyyyyyyyyyyyyyyyy')
     console.log(this.qualityDTO)
     return this.qualityDTO;



  }
}
