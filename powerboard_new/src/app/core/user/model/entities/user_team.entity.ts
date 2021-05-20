import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { accessRole } from 'src/app/core/auth/model/access_role.enum';
import { User } from './user.entity';
import { Team } from 'src/app/dashboard/teams/model/entities/team.entity';
@Entity('user_team')
export class UserTeam extends BaseEntity {
  @ManyToOne(() => User, user => user.userTeam, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_Id' })
  user!: User;

  @ManyToOne(() => Team, team => team.userTeam, { eager: true, nullable: true })
  @JoinColumn({ name: 'team_Id' })
  team!: Team;

  @Column('int', { name: 'access_role', nullable: true, default: accessRole.TEAM_MEMBER })
  accessRole!: number;

  @Column({ nullable: true, default: true })
  isActive!: boolean;
}
