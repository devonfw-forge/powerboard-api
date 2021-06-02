import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { roles } from '../../../auth/model/roles.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserTeam } from './user_team.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false, unique:true })
  username!: string;

  @Column('varchar', { length: 255, nullable: false })
  @Exclude({ toPlainOnly: true })
  password!: string;

  @Column('varchar', { length: 255, nullable: true })
  email!: string;

  @Column('int', { nullable: false, default: roles.USER })
  role!: number;

  @Column('boolean', {default:false })
  isPasswordChanged!:boolean;

  @OneToMany(() => UserTeam, userteam => userteam.user, { nullable: true })
  userTeam!: UserTeam[];

  // @OneToOne(() => UserInfo, { eager: true, nullable: true })
  // @JoinColumn({ name: 'user_info_id', referencedColumnName: 'id' })
  // user!: UserInfo;

  // @ManyToMany(() => Team, { eager: true, cascade: true, nullable: true })
  // teamId!: Team[];
  // @JoinTable({
  //   name: 'user_team',
  //   joinColumn: {
  //     name: 'user_Id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'team_Id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // teamId!: Team[];
}
