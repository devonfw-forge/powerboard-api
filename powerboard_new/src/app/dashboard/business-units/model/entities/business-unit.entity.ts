import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';

@Entity()
export class BusinessUnit extends BaseEntity {
  @Column('varchar', { length: 255, nullable: true })
  name!: string;

  @Column('varchar', { nullable: true })
  parent_id!: string;

  @Column('varchar', { nullable: true })
  root_parent_id!: string;
}
