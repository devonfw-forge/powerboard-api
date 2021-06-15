import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';
import { UserTeam } from '../../../core/user/model/entities/user_team.entity';
import { ADCenter } from '../../../dashboard/ad-center/model/entities/ad-center.entity';

@Entity()
export class Team extends BaseEntity {
  @Column('varchar', { length: 255, unique: true, nullable: false })
  name!: string;

  @Column('varchar', { name: 'team_code', length: 255, nullable: false, unique: true })
  teamCode!: string;

  @Column('varchar', { name: 'project_key', length: 255, nullable: true, unique: true })
  projectKey!: string;

  @Column('varchar', { length: 3000, nullable: true })
  logo!: string;

  @ManyToOne(() => ADCenter, { eager: true })
  @JoinColumn({ name: 'ad_center_id', referencedColumnName: 'id' })
  ad_center!: ADCenter;

  @OneToMany(() => UserTeam, userTeam => userTeam.team, { nullable: true })
  userTeam!: UserTeam[];
}
