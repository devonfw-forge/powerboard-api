import { BusinessUnit } from '../../../business-units/model/entities/business-unit.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class ADCenter extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name!: string;

  @ManyToOne(() => BusinessUnit, { nullable: true })
  @JoinColumn({ name: 'business_id', referencedColumnName: 'id' })
  businessUnit?: BusinessUnit;
}
