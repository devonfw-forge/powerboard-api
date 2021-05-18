import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { roles } from '../../../auth/model/roles.enum';
import { Team } from '../../../../dashboard/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { UserInfo } from '../../../userinfo/model/entities/userinfo.entity';
@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  username!: string;

  @Column('varchar', { length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  password!: string;
  
  @Column('varchar', { length: 255, nullable: true })
  email!: string; 

  @Column('int', { nullable: false, default: roles.USER })
  role!: number;

  @OneToOne(() => UserInfo, { eager: true , nullable:true })
  @JoinColumn({ name: 'user_info_id', referencedColumnName: 'id' })
  user!: UserInfo;

  @ManyToMany(() => Team, { eager: true, cascade:true })
  @JoinTable()
  teamId!: Team[];
}
