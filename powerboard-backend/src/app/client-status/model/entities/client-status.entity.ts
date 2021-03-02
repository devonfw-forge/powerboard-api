import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class ClientStatus extends BaseEntity {
    @Column('int', { nullable: false })
    clientRating!: number;

    @OneToOne(()=>Team ,{ eager: true })
    @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
    teamId!: Team;

    @OneToOne(()=>Sprint ,{ eager: true })
    @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
    sprintId!: Sprint;
}
