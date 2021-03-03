import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class ClientStatus extends BaseEntity {
    @Column('int', { nullable: false })
    clientRating!: number;

    @ManyToOne(()=>Team ,{ eager: true })
    @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
    teamId!: Team;
     
    @Column('int', { nullable: false })
    sprintNumber!: number;

    @OneToOne(()=>Sprint ,{ eager: true })
    @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
    sprintId!: Sprint;
}
