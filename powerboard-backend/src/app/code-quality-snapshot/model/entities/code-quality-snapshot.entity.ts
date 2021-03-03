import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class CodeQualitySnapshot extends BaseEntity {
  @Column('int', { nullable: false })
  bugs!: number;

  @Column('int', { nullable: false })
  debt!: number;

  @Column('int', { nullable: false })
  codeCoverage!: number;

  @Column('varchar', { length: 255, nullable: false })
  status!: string;

  @ManyToOne(() => Team, { eager: false })
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  teamId!: Team;

  @Column('timestamp', { nullable: false })
  snapshotTime!: string;
}
