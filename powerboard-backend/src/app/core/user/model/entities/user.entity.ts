import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { roles } from '../../../auth/model/roles.enum';
import { Team } from '../../../../web-app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  username!: string;

  @Column('varchar', { length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column('int', { nullable: false, default: roles.USER })
  role!: number;

  @Column('varchar', { length: 255, nullable: false })
  name!: string;

  @ManyToOne(()=>Team ,{ eager: true })
  @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
  teamId!: Team;
}
