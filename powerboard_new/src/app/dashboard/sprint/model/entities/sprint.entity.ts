import { Team } from '../../../teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { SprintStatus } from './sprint_status.entity';
import { SprintWorkUnit } from './sprint_work_unit.entity';

@Entity()
export class Sprint extends BaseEntity {
  @Column('int', { nullable: false })
  sprint_number!: number;

  @ManyToOne(() => SprintStatus, { eager: true })
  @JoinColumn({ name: 'status', referencedColumnName: 'id' })
  status!: number;

  @Column('date', { nullable: false })
  start_date!: string;

  @Column('date', { nullable: false })
  end_date!: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team!: Team;

  @ManyToOne(() => SprintWorkUnit, { eager: true })
  @JoinColumn({ name: 'work_unit', referencedColumnName: 'id' })
  work_unit!: string;
}
