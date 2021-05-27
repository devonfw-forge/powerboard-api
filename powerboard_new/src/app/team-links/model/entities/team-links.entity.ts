import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../../teams/model/entities/team.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class TeamLinks extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  title!: string;

  @Column('varchar', { name: 'link', length: 5000, nullable: false })
  link!: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'team_id', referencedColumnName: 'id' })
  team!: string;
}
