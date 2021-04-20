import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../../dashboard/teams/model/entities/team.entity';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class DailyMeeting extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  type!: string;

  @Column('varchar', { name: 'daily_meeting_link', length: 5000, nullable: false })
  dailyMeetingLink!: string;

  @ManyToOne(() => Team, { eager: true })
  @JoinColumn({ name: 'daily_team_id', referencedColumnName: 'id' })
  team!: Team;
}
