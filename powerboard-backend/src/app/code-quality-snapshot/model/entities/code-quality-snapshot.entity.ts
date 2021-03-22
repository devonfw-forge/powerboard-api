import { Team } from '../../../teams/model/entities/team.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class CodeQualitySnapshot extends BaseEntity {
  @Column('int', { nullable: false })
  bugs!: number;

  @Column('int', { nullable: false })
  debt!: number;

  @Column('int', { nullable: false })
  code_coverage!: number;

  @Column('varchar', { length: 255, nullable: false })
  status!: string;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team!: Team;

  @Column('timestamp', { nullable: false })
  snapshot_time!: string;
}
