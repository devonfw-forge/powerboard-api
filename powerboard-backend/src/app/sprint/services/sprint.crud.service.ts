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

  async getSprintDetailResponse(teamId: number): Promise<SprintDetailResponse> {
    let sprintDetailResponse: SprintDetailResponse = {} as SprintDetailResponse;
    const result = await this.sprintRepository.query(
      ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    var end_date = new Date(result[0].end_date);
    var start_date = new Date(result[0].start_date);
    var currentDate = new Date();
    const diff1 = Math.abs(currentDate.getTime() - start_date.getTime());
    const diff2 = Math.abs(end_date.getTime() - start_date.getTime());
    const Sprint_current_day = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
    const Sprint_days = Math.ceil(diff2 / (1000 * 60 * 60 * 24));
    sprintDetailResponse.Sprint_current_day = Sprint_current_day;
    sprintDetailResponse.sprint_number = result[0].sprint_number;
    sprintDetailResponse.Sprint_days = Sprint_days;
    return sprintDetailResponse;
  }

  burndownResponse: BurndownResponse = {} as BurndownResponse;
  async getBurndown(teamId: number): Promise<BurndownResponse> {
    let output: BurndownResponse = {} as BurndownResponse;
    const result = await this.sprintRepository.query(
      ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status,sw.work_unit, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status  INNER JOIN sprint_work_unit sw ON sw.id = s.work_unit INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
        teamId +
        ' and s.status = 2 order by ss.date_time desc limit(2)',
    );
    console.log(result);
    const start_date = new Date(result[0].start_date);
    const end_date = new Date(result[0].end_date);
    const diff = Math.abs(new Date().getTime() - start_date.getTime());
    const diff1 = Math.abs(end_date.getTime() - start_date.getTime());
    const currentDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const totalDays = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
    if (result[0].name == 'Work Committed') {
      output = this.calculateBurnDownFirstCase(result, totalDays, currentDay);
      console.log(output);
    } else if (result[0].name == 'Work Completed') {
      output = this.calculateBurnDownSecondCase(result, totalDays, currentDay);
    } else {
      console.log('work spillover');
    }
    return output;
  }

  calculateBurnDownFirstCase(result: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(result[0].value) > Number(result[1].value)) {
      this.burndownResponse.workUnit = result[0].work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      this.burndownResponse.remainingWork = result[0].value - result[1].value;
      const ideal = Math.round((result[0].value / totalDays) * currentDay);
      const actual = result[1].value;
      if (ideal > actual) {
        this.burndownResponse.count = ideal - actual;
        this.burndownResponse.burndownStatus = 'Behind Time';
      } else if (ideal == actual) {
        this.burndownResponse.burndownStatus = 'On Time';
      } else {
        this.burndownResponse.count = actual - ideal;
        this.burndownResponse.burndownStatus = 'Ahead Time';
      }
    }
    return this.burndownResponse;
  }

  calculateBurnDownSecondCase(result: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(result[0].value) < Number(result[1].value)) {
      this.burndownResponse.workUnit = result[0].work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      this.burndownResponse.remainingWork = result[1].value - result[0].value;
      const ideal = Math.round((result[1].value / totalDays) * currentDay);
      const actual = result[0].value;
      if (ideal > actual) {
        this.burndownResponse.count = ideal - actual;
        this.burndownResponse.burndownStatus = 'Behind Time';
      } else if (ideal == actual) {
        this.burndownResponse.burndownStatus = 'On Time';
      } else {
        this.burndownResponse.count = actual - ideal;
        this.burndownResponse.burndownStatus = 'Ahead Time';
      }
    }
    return this.burndownResponse;
  }

  async getVelocityComparison(teamId: number): Promise<VelocityComparisonResponse> {
    let velocityComparisonResponse = {} as VelocityComparisonResponse;
    const sprintMetricsResponse = await this.sprintRepository.query(
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
    if (sprintMetricsResponse[0].name == 'Work Committed') {
      velocityComparisonResponse.Committed = sprintMetricsResponse[0].value;
      velocityComparisonResponse.Completed = sprintMetricsResponse[1].value;
    } else if ((sprintMetricsResponse[1].name = 'Work Committed')) {
      velocityComparisonResponse.Committed = sprintMetricsResponse[1].value;
      velocityComparisonResponse.Committed = sprintMetricsResponse[0].value;
    }
    return velocityComparisonResponse;
  }
}
