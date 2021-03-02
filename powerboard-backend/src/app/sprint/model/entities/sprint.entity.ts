import { Team } from 'src/app/teams/model/entities/team.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class Sprint extends BaseEntity {

    @Column('int', { nullable: false })
    sprintNumber!: number;
   
    @Column('int', { nullable: false })
    status!: number;

    @Column('varchar', { length: 255, nullable: false })
    startDate!: string;

    @Column('varchar', { length: 255, nullable: false })
    endDate!: string;
    
    @ManyToOne(()=>Team ,{ eager: true })
    @JoinColumn({ name: 'teamId', referencedColumnName: 'id' })
    teamId!: number;
}
