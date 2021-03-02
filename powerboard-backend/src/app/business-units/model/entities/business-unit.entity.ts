import { Column, Entity} from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class BusinessUnit extends BaseEntity {
    @Column('varchar', { length: 255, nullable: false })
    name!: string;
    
    @Column('int', { nullable: false })
    parent_id!: number;

    @Column('int', { nullable: false })
    root_parent_id!: number;
    
   
}
