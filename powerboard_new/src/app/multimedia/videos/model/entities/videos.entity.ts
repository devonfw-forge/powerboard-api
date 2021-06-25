import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../../../teams/model/entities/team.entity';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class Videos extends BaseEntity {
  @Column('varchar', { length: 3000, nullable: false })
  content!: string;

  @ManyToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'video_team_id', referencedColumnName: 'id' })
  team!: string;
}
