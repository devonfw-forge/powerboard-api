import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class ClientStatus extends BaseEntity {
    @Column('int', { nullable: false })
    clientRating!: number;

    @OneToOne(()=>Sprint ,{ eager: true })
    @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
    sprintId!: Sprint;
}
