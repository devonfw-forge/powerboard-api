import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Repository } from 'typeorm';
import { BurndownDTO } from '../model/dto/BurndownDTO';
import { Burndown } from '../model/entities/burndown.entity';


@Injectable()
export class BurndownCrudService extends TypeOrmCrudService<Burndown> {
  constructor(@InjectRepository(Burndown) private readonly burndownRepository: Repository<Burndown>,
            @InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(burndownRepository);
  }
    burndownDTO:BurndownDTO= new BurndownDTO();
  async getBurndown(teamId:number):Promise<BurndownDTO>{
    console.log(teamId)
   const result = await this.sprintRepository.createQueryBuilder("sprint")
                                                     .where("sprint.teamId=:teamId" ,{teamId:teamId})
                                                     .orderBy("sprint.sprintNumber","DESC")
                                                     .limit(1).getOne();

   const  burndownResult =await this.burndownRepository.createQueryBuilder("burndown")
                                                .where("burndown.sprintId=:sprintId",{sprintId:result!.id})
                                                .orderBy("burndown.SprintDays" ,"DESC")
                                                .limit(1).getOne();
          const a = burndownResult?.actualWork;
          const b = burndownResult?.estimatedWork;
          const c = b!-a!;
          const days = burndownResult?.SprintDays;
          const remainingDays = 15- days!;
          
          
   console.log(burndownResult);
          this.burndownDTO.remainingDays = remainingDays;
          this.burndownDTO.remainingWork = burndownResult!.actualWork;
          if(c>0){
            this.burndownDTO.burndownStatus ='Ahead Time'
          }
          else if(c==0){
            this.burndownDTO.burndownStatus='On Time'
          }
          else{
            this.burndownDTO.burndownStatus='Behind Time'
          }
          this.burndownDTO.count = c;
   return this.burndownDTO;
  }
}