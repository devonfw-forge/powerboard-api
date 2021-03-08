import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { SprintStatus } from './sprint_status.entity';

@Entity()
export class Sprint extends BaseEntity {
  @Column('int', { nullable: false })
  sprint_number!: number;

  @ManyToOne(() => SprintStatus, { eager: false })
  @JoinColumn({ name: 'status', referencedColumnName: 'id' })
  status!: number;

  @Column('varchar', { length: 255, nullable: false })
  start_date!: string;

  @Column('varchar', { length: 255, nullable: false })
  end_date!: string;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team!: Team;

  // @OneToMany(() => SprintSnapshot, snapshot => snapshot.sprint)
  // @JoinColumn({ name: 'id', referencedColumnName: 'sprintId' })
  // sprintSnapshot!: SprintSnapshot[];
}
