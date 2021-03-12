import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../model/dto/BurndownResponse';
import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';
import { Sprint } from '../model/entities/sprint.entity';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> {
  constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(sprintRepository);
  }
 
  async getSprintDetailResponse(teamId:number):Promise<SprintDetailResponse>{
    let sprintDetailResponse:SprintDetailResponse ={} as SprintDetailResponse
    const result = await this.sprintRepository.query(
      ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    var date2 = new Date(result[0].end_date)
    var date3 = new Date(result[0].start_date);
       var currentDate = new Date();
       console.log('HIIIIIIIIIIIIIIIiii')
       console.log(currentDate)
        const diff1 =Math.abs(currentDate.getTime()-date3.getTime())
        const diff2 = Math.abs(date2.getTime()-date3.getTime())
        const Sprint_current_day = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
        const Sprint_days = Math.ceil(diff2 / (1000 * 60 * 60 * 24));
    sprintDetailResponse.Sprint_current_day = Sprint_current_day;
     sprintDetailResponse.sprint_number = result[0].sprint_number;
    sprintDetailResponse.Sprint_days = Sprint_days;
    return sprintDetailResponse
  }
  async getBurndown(teamId: number): Promise<BurndownResponse> {
    let burndownResponse :BurndownResponse ={} as BurndownResponse
    const result = await this.sprintRepository.query(
      ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    console.log('hjjhjhjhjhj')
  console.log(result)
    if (result[0].name == 'Work Committed') {
      if (Number(result[0].value) > Number(result[1].value)) {
        var end_date = new Date(result[0].end_date); //31 march
        var snapshot_time = new Date(result[0].date_time);// 12 march
        var start_date = new Date(result[0].start_date)
        const diff = Math.abs(end_date.getTime() - snapshot_time.getTime());
        const diff1 = Math.abs(end_date.getTime() - start_date.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const totalDays =  Math.ceil(diff1 / (1000 * 60 * 60 * 24));
        console.log(days);
        console.log('fffffffffff')
        console.log(totalDays)
        burndownResponse.remainingDays = days;
        burndownResponse.remainingWork = result[0].value - result[1].value;
        const currentDay = totalDays - (days);
        console.log(currentDay)
        const ideal = Math.round((result[0].value / totalDays) * currentDay);
        console.log(ideal)
        const actual = result[1].value;
        console.log(actual)
        //const actual = (result[1].value / 15) * currentDay;
        console.log('Actual value  =' + actual);
        console.log('Ideal value  =' + ideal);
        if (ideal > actual) {
          burndownResponse.count = ideal - actual;
          burndownResponse.burndownStatus = 'Behind Time';
        } else if (ideal == actual) {
          burndownResponse.burndownStatus = 'On Time';
        } else {
          burndownResponse.count = actual - ideal;
          burndownResponse.burndownStatus = 'Ahead Time';
        }
      }
    } else if (result[0].name == 'Work Completed') {
      if (Number(result[1].value) > Number(result[0].value)) {
        var date1 = new Date(result[0].end_date);
        var date2 = new Date(result[0].date_time);

        const diff = Math.abs(date1.getTime() - date2.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        console.log(days);
        burndownResponse.remainingDays = days;
        burndownResponse.remainingWork = result[1].value - result[0].value;
        const currentDay = 15 - days;
        const ideal = Math.round((result[0].value / 15) * currentDay);
        const actual = result[0].value;
        //const actual = (result[1].value / 15) * currentDay;
        console.log('Actual value  =' + actual);
        console.log('Ideal value  =' + ideal);
        if (ideal > actual) {
          burndownResponse.count = ideal - actual;
          burndownResponse.burndownStatus = 'Behind Time';
        } else if (ideal == actual) {
          burndownResponse.burndownStatus = 'On Time';
        } else {
          burndownResponse.count = actual - ideal;
          burndownResponse.burndownStatus = 'Ahead Time';
        }
      }
    } else {
      console.log('Work spillover');
    }
    return burndownResponse;
  }

  async getVelocityComparison(teamId: number): Promise<VelocityComparisonResponse> {
    let velocityComparisonResponse ={} as VelocityComparisonResponse
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
    velocityComparisonResponse.Avg = avg;
    if (sprintMetrics[0].name == 'Work Committed') {
      velocityComparisonResponse.Committed = sprintMetrics[0].value;
      velocityComparisonResponse.Completed = sprintMetrics[1].value;
    } else if ((sprintMetrics[1].name = 'Work Committed')) {
      velocityComparisonResponse.Committed = sprintMetrics[1].value;
      velocityComparisonResponse.Committed = sprintMetrics[0].value;
    }
    return velocityComparisonResponse;
  }
}
