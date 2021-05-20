import { BusinessUnit } from '../../../business-units/model/entities/business-unit.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
// import { User } from 'src/app/core/user/model/entities/user.entity';
import { UserTeam } from 'src/app/core/user/model/entities/user_team.entity';

@Entity()
export class Team extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name!: string;

  @Column('varchar', { name: 'team_code', length: 255, nullable: false, unique: true })
  teamCode!: string;

  @Column('varchar', { length: 3000, nullable: true })
  logo!: string;

  @ManyToOne(() => BusinessUnit, { eager: true })
  @JoinColumn({ name: 'business_unit_id', referencedColumnName: 'id' })
  business_unit!: BusinessUnit;

  // @ManyToMany(() => User, user => user.teamId,{nullable:true})
  // users!: User[]

  @OneToMany(() => UserTeam, userTeam => userTeam.team, { nullable: true })
  userTeam!: UserTeam[];
}
