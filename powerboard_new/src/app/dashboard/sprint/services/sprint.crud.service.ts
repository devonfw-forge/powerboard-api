import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { BurndownResponse } from '../model/dto/BurndownResponse';
import { SprintDetailResponse } from '../model/dto/SprintDetailResponse';
import { VelocityComparisonResponse } from '../model/dto/VelocityComparisonResponse';
import { Sprint } from '../model/entities/sprint.entity';
import { SprintSnapshot } from '../model/entities/sprintSnapshot.entity';
import { SprintSnapshotMetric } from '../model/entities/sprintSnapshotMetric.entity';
import { SprintMetric } from '../model/entities/sprint_metric.entity';
import { SprintStatus } from '../model/entities/sprint_status.entity';
import { SprintWorkUnit } from '../model/entities/sprint_work_unit.entity';

@Injectable()
export class SprintCrudService extends TypeOrmCrudService<Sprint> {
  constructor(@InjectRepository(Sprint) private readonly sprintRepository: Repository<Sprint>) {
    super(sprintRepository);
  }

  /**
   * getSprintDetailResponse method will fetch the current sprint details
   * @param {teamId} ,Takes teamId as input
   * @return {SprintDetailResponse} SprintDetail as response
   */
  async getSprintDetailResponse(teamId: string): Promise<SprintDetailResponse | undefined> {
    let sprintDetailResponse: SprintDetailResponse = {} as SprintDetailResponse;

    const sprintDetail = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .addSelect('ss.date_time', 'ss_date_time')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    // const result = await this.sprintRepository.query(
    //   ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
    //   teamId +
    //   ' and s.status = 2 order by ss.date_time desc limit(2)',
    // );
    if (sprintDetail == null) {
      return undefined;
    } else {
      console.log('sprint detail response ***************************************');
      console.log(sprintDetail);
      var end_date = new Date(sprintDetail[0].sprint_end_date);
      var start_date = new Date(sprintDetail[0].sprint_start_date);
      var currentDate = new Date();
      const diff1 = Math.abs(currentDate.getTime() - start_date.getTime());
      const diff2 = Math.abs(end_date.getTime() - start_date.getTime());
      const Sprint_current_day = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
      const Sprint_days = Math.ceil(diff2 / (1000 * 60 * 60 * 24));
      sprintDetailResponse.Sprint_current_day = Sprint_current_day;
      sprintDetailResponse.sprint_number = sprintDetail[0].sprint_sprint_number;
      sprintDetailResponse.Sprint_days = Sprint_days;
      return sprintDetailResponse;
    }
  }
  burndownResponse: BurndownResponse = {} as BurndownResponse;
  /**
   * getBurndown method will retrieve the burndown report of current sprint
   * @param {teamId} teamId Takes teamId as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  async getBurndown(teamId: string): Promise<BurndownResponse | undefined> {
    let output: BurndownResponse = {} as BurndownResponse;

    const sprintForBurndown = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .addSelect('ss.date_time', 'ss_date_time')
      .addSelect('sw.work_unit', 'sw_work_unit')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .innerJoin(SprintWorkUnit, 'sw', 'sw.id=sprint.work_unit')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    // const result = await this.sprintRepository.query(
    //   ' select s.id,s.sprint_number,s.start_date, s.end_date ,st.status,sw.work_unit, ss.id, ss.date_time, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status  INNER JOIN sprint_work_unit sw ON sw.id = s.work_unit INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
    //   teamId +
    //   ' and s.status = 2 order by ss.date_time desc limit(2)',
    // );
    console.log('Get Burndown ***************************');
    console.log(sprintForBurndown);
    if (sprintForBurndown == null) {
      return undefined;
    } else {
      const start_date = new Date(sprintForBurndown[0].sprint_start_date);
      const end_date = new Date(sprintForBurndown[0].sprint_end_date);
      const diff = Math.abs(new Date().getTime() - start_date.getTime());
      const diff1 = Math.abs(end_date.getTime() - start_date.getTime());
      const currentDay = Math.ceil(diff / (1000 * 60 * 60 * 24));
      const totalDays = Math.ceil(diff1 / (1000 * 60 * 60 * 24));
      if (sprintForBurndown[0].smt_name == 'Work Committed') {
        return this.calculateBurnDownFirstCase(sprintForBurndown, totalDays, currentDay);
      } else if (sprintForBurndown[0].smt_name == 'Work Completed') {
        return this.calculateBurnDownSecondCase(sprintForBurndown, totalDays, currentDay);
      } else {
        console.log('work spillover');
      }
      return output;
    }
  }

  /**
   * calculateBurndownFirstCase method will retrieve the burndown report of current sprint if at 0 index , there is 'Work Committed'
   * @param {result, totalDays, currentDay} .Takes these parameter as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  calculateBurnDownFirstCase(sprintForBurndown: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(sprintForBurndown[0].ssm_value) > Number(sprintForBurndown[1].ssm_value)) {
      this.burndownResponse.workUnit = sprintForBurndown[0].sw_work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      console.log(this.burndownResponse.remainingDays);
      this.burndownResponse.remainingWork = sprintForBurndown[0].ssm_value - sprintForBurndown[1].ssm_value;
      const ideal = Math.round((sprintForBurndown[0].ssm_value / totalDays) * currentDay);
      const actual = sprintForBurndown[1].ssm_value;
      this.burndownResponse = this.getBurndownStatus(ideal, actual);
    }
    return this.burndownResponse;
  }

  /**
   * calculateBurndownSecondCase method will retrieve the burndown report of current sprint if at 0 index , there is 'Work Completed'
   * @param {result, totalDays, currentDay} .Takes these parameter as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint
   */
  calculateBurnDownSecondCase(sprintForBurndown: any, totalDays: number, currentDay: number): BurndownResponse {
    if (Number(sprintForBurndown[0].ssm_value) < Number(sprintForBurndown[1].ssm_value)) {
      this.burndownResponse.workUnit = sprintForBurndown[0].sw_work_unit;
      this.burndownResponse.remainingDays = totalDays - currentDay;
      console.log(this.burndownResponse.remainingDays);
      this.burndownResponse.remainingWork = sprintForBurndown[1].ssm_value - sprintForBurndown[0].ssm_value;
      const ideal = Math.round((sprintForBurndown[1].ssm_value / totalDays) * currentDay);
      const actual = sprintForBurndown[0].ssm_value;
      this.burndownResponse = this.getBurndownStatus(ideal, actual);
    }

    return this.burndownResponse;
  }

  /**
   * getBurndownStatus method will fetch the status
   * @param {ideal, actual} .Takes Ideal and actual rate as input
   * @return {BurndownResponse} Burndown as response for that team's current sprint status
   */
  getBurndownStatus(ideal: number, actual: number): BurndownResponse {
    if (ideal > actual) {
      this.burndownResponse.count = ideal - actual;
      this.burndownResponse.burndownStatus = 'Behind Time';
    } else if (ideal == actual) {
      this.burndownResponse.burndownStatus = 'On Time';
    } else {
      this.burndownResponse.count = actual - ideal;
      this.burndownResponse.burndownStatus = 'Ahead Time';
    }
    return this.burndownResponse;
  }

  velocityComparisonResponse = {} as VelocityComparisonResponse;
  /**
   * getVelocityComparison method will retrieve the velocity report of current sprint
   * @param {teamId} teamId Takes teamId as input
   * @return {VelocityComparisonResponse} VelocityComparison as response for that team's current sprint
   */
  async getVelocityComparison(teamId: string): Promise<VelocityComparisonResponse> {
    const sprintMetricsResponse = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('ss.date_time', 'DESC')
      .limit(2)
      .getRawMany();

    // const sprintMetricsResponse = await this.sprintRepository.query(
    //   ' select s.id,st.status, ss.id, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id where s.team_id =' +
    //   teamId +
    //   ' and s.status = 2 order by ss.date_time desc limit(2)',
    // );

    console.log('Get Velocity Comparison ****************************************');
    console.log(sprintMetricsResponse);

    const previousSprintCompleted = await this.sprintRepository
      .createQueryBuilder('sprint')
      .addSelect('sprint.id', 'sprint_id')
      .addSelect('st.status', 'st_status')
      .addSelect('ss.id', 'ss_id')
      .addSelect('smt.name', 'smt_name')
      .addSelect('ssm.value', 'ssm_value')
      .innerJoin(SprintStatus, 'st', 'st.id=sprint.status')
      .innerJoin(SprintSnapshot, 'ss', 'ss.sprint_id=sprint.id')
      .innerJoin(SprintSnapshotMetric, 'ssm', 'ssm.snapshot_id=ss.id')
      .leftJoin(SprintMetric, 'smt', 'smt.id=ssm.metric_id')
      .where('sprint.team_id =:team_Id', { team_Id: teamId })
      .andWhere('sprint.status=:status', { status: '11155bf3-ada5-495c-8019-8d7ab76d488e' })
      .andWhere('ssm.metric_id=:metric_id', { metric_id: '11155bf2-ada5-495c-8019-8d7ab76d488e' })
      .orderBy('sprint.id')
      .getRawMany();
    console.log('Previous sprint completed ***********************');
    console.log(previousSprintCompleted);
    // const previousSprintCompleted = await this.sprintRepository.query(
    //   'select s.id ,st.status, ss.id, smt.name, ssd.value from sprint s INNER JOIN sprint_status st ON st.id = s.status INNER JOIN sprint_snapshot ss ON ss.sprint_id = s.id INNER JOIN sprint_snapshot_metric ssd ON ssd.snapshot_id = ss.id  LEFT JOIN sprint_metric smt ON smt.id = ssd.metric_id  where s.team_id =' +
    //   teamId +
    //   ' and s.status=3 and ssd.metric_id=2 order by s.id',
    // );
    // console.log("Using raw query for previous sprint");
    // console.log(previousSprintCompleted);

    this.velocityComparisonResponse.Avg = this.getAverageVelocity(previousSprintCompleted);
    this.velocityComparisonResponse = this.getVelocityData(sprintMetricsResponse);
    return this.velocityComparisonResponse;
  }

  /**
   * getAverageVelocity method will calculate the average velocity
   * @param {previousSprintCompleted} previousSprintCompleted Takes these parameters as input
   * @return {VelocityComparisonResponse} Average velocity as response
   */
  getAverageVelocity(previousSprintCompleted: any): number {
    let sum = 0;
    for (let i = 0; i < previousSprintCompleted.length; i++) {
      sum = sum + Number(previousSprintCompleted[i].ssm_value);
    }
    let avg = sum / previousSprintCompleted.length;
    return avg;
  }

  /**
   * getVelocityData method will fetch current sprints data
   * @param {sprintMetricResponse} sprintMetricsResponse Takes as input
   * @return {VelocityComparisonResponse} current sprint committed and completed as response
   */
  getVelocityData(sprintMetricsResponse: any): VelocityComparisonResponse {
    if (sprintMetricsResponse[0].smt_name == 'Work Committed') {
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[0].ssm_value);
      this.velocityComparisonResponse.Completed = Number(sprintMetricsResponse[1].ssm_value);
    } else if (sprintMetricsResponse[1].smt_name == 'Work Committed') {
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[1].ssm_value);
      this.velocityComparisonResponse.Committed = Number(sprintMetricsResponse[0].ssm_value);
    }
    return this.velocityComparisonResponse;
  }
}
