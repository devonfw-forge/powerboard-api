import { Sprint } from 'src/app/sprint/model/entities/sprint.entity';

import { Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class Burndown extends BaseEntity {
    @Column('int', { nullable: false })
    estimatedWork!:number;
   
    @Column('int', { nullable: false })
    actualWork!:number; 
    
    @Column('int', {nullable:false})
    SprintDays!:number;
    
    @ManyToOne(()=>Sprint ,{ eager: true })
    @JoinColumn({ name: 'sprintId', referencedColumnName: 'id' })
    sprintId!: Sprint;
   
}