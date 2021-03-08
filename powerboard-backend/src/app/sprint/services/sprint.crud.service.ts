import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BurndownDTO } from '../model/dto/BurndownDTO';
import { VelocityComaprisonDTO } from '../model/dto/VelocityComparisonDTO';
import { Sprint } from '../model/entities/sprint.entity';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> {
  constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(sprintRepository);
  }

  async getBurndown(teamId: number): Promise<any> {
    let burndownDTO = new BurndownDTO();
    console.log(teamId);
    const result = await this.sprintRepository.query(
      ' select s.id,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );

    if (result[0].name == 'Work Committed') {
      if (Number(result[0].value) > Number(result[1].value)) {
        var date1 = new Date(result[0].end_date);
        var date2 = new Date(result[0].date_time);

        const diff = Math.abs(date1.getTime() - date2.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        console.log(days);
        burndownDTO.remainingDays = days;
        burndownDTO.remainingWork = result[0].value - result[1].value;
        const currentDay = 15 - days;
        const ideal = Math.round((result[0].value / 15) * currentDay);
        const actual = result[1].value;
        //const actual = (result[1].value / 15) * currentDay;
        console.log('Actual value  =' + actual);
        console.log('Ideal value  =' + ideal);
        if (ideal > actual) {
          burndownDTO.count = ideal - actual;
          burndownDTO.burndownStatus = 'Behind Time';
        } else if (ideal == actual) {
          burndownDTO.burndownStatus = 'On Time';
        } else {
          burndownDTO.count = actual - ideal;
          burndownDTO.burndownStatus = 'Ahead Time';
        }
      }
    } else if (result[0].name == 'Work Completed') {
      if (Number(result[1].value) > Number(result[0].value)) {
        var date1 = new Date(result[0].end_date);
        var date2 = new Date(result[0].date_time);

        const diff = Math.abs(date1.getTime() - date2.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        console.log(days);
        burndownDTO.remainingDays = days;
        burndownDTO.remainingWork = result[1].value - result[0].value;
        const currentDay = 15 - days;
        const ideal = Math.round((result[0].value / 15) * currentDay);
        const actual = result[0].value;
        //const actual = (result[1].value / 15) * currentDay;
        console.log('Actual value  =' + actual);
        console.log('Ideal value  =' + ideal);
        if (ideal > actual) {
          burndownDTO.count = ideal - actual;
          burndownDTO.burndownStatus = 'Behind Time';
        } else if (ideal == actual) {
          burndownDTO.burndownStatus = 'On Time';
        } else {
          burndownDTO.count = actual - ideal;
          burndownDTO.burndownStatus = 'Ahead Time';
        }
      }
    }
    else{
      console.log('Work spillover')
    }
    console.log(burndownDTO);
    return burndownDTO;
    //return result;
  }

  async getVelocityComparison(teamId: number): Promise<any> {
    let velocityDTO = new VelocityComaprisonDTO();
    const result = await this.sprintRepository.query(
      ' select s.id,st.status, ss.id, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    if (result[0].name == 'Work Committed') {
      velocityDTO.Committed = result[0].value;
      velocityDTO.Completed = result[1].value;
    } else if ((result[1].name = 'Work Committed')) {
      velocityDTO.Committed = result[1].value;
      velocityDTO.Committed = result[0].value;
    }
    return velocityDTO;
  }
}
