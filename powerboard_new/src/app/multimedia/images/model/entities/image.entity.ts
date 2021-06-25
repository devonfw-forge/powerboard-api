import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../../../teams/model/entities/team.entity';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class Images extends BaseEntity {
  @Column('varchar', { length: 3000, nullable: false })
  image!: string;

  @ManyToOne(() => Team, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'image_team_id', referencedColumnName: 'id' })
  team!: string;
}
