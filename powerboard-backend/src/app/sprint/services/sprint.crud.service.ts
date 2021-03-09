import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BurndownDTO } from '../model/dto/BurndownDTO';
import { VelocityComparisonDTO } from '../model/dto/VelocityComparisonDTO';
import { Sprint } from '../model/entities/sprint.entity';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> {
  constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(sprintRepository);
  }

  async getBurndown(teamId: number): Promise<BurndownDTO> {
    let burndownDTO = new BurndownDTO();
    console.log(teamId);
    const result = await this.sprintRepository.query(
      ' select s.id,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );

    console.log(result);
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
    } else {
      console.log('Work spillover');
    }
    console.log(burndownDTO);
    return burndownDTO;
  }

  async getVelocityComparison(teamId: number): Promise<VelocityComparisonDTO> {
    let velocityComparisonDTO = new VelocityComparisonDTO();
    const sprintMetrics = await this.sprintRepository.query(
      ' select s.id,st.status, ss.id, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    const previousSprintCompleted = await this.sprintRepository.query(
      'select s.id ,st.status, ss.id, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id  LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id  where s.team_id =' +
        teamId +
        ' and s.status=3 and ssd.metric_id=2 order by s.id',
    );
    console.log(previousSprintCompleted);
    let sum = 0;
    for (let i = 0; i < previousSprintCompleted.length; i++) {
      sum = sum + Number(previousSprintCompleted[i].value);
    }
    let avg = sum / previousSprintCompleted.length;
    velocityComparisonDTO.Avg = avg;
    if (sprintMetrics[0].name == 'Work Committed') {
      velocityComparisonDTO.Committed = sprintMetrics[0].value;
      velocityComparisonDTO.Completed = sprintMetrics[1].value;
    } else if ((sprintMetrics[1].name = 'Work Committed')) {
      velocityComparisonDTO.Committed = sprintMetrics[1].value;
      velocityComparisonDTO.Committed = sprintMetrics[0].value;
    }
    return velocityComparisonDTO;
  }
}
