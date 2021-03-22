import { BusinessUnit } from '../../../business-units/model/entities/business-unit.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../shared/model/entities/base-entity.entity';

@Entity()
export class Team extends BaseEntity {
  @Column('varchar', { length: 255, nullable: false })
  name!: string;

  @ManyToOne(() => BusinessUnit, { eager: true })
  @JoinColumn({ name: 'business_unit_id', referencedColumnName: 'id' })
  business_unit!: BusinessUnit;
}
