
import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';


@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name!: string;

  @ManyToOne(()=>Team ,{ eager: true })
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  teamId!: Team;
}
