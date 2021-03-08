import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class TeamSpirit extends BaseEntity {
  @Column('int', { nullable: false })
  team_spirit_rating!: number;

  @OneToOne(() => Sprint, { eager: false })
  @JoinColumn({ name: 'sprint_id', referencedColumnName: 'id' })
  sprint!: Sprint;
}
