import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class TeamSpirit extends BaseEntity {

    @Column('int', { nullable: false })
    teamSpiritRating!: number;

    @ManyToOne(() => Team, { eager: false })
    @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
    teamId!: Team;
    
    @Column('int', { nullable: false })
    sprintNumber!: number;

    @OneToOne(()=>Sprint ,{ eager: false })
    @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
    sprintId!: Sprint;
}
