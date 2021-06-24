import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity, } from 'typeorm';


@Entity()
export class UserInfo extends BaseEntity {
  @Column('uuid',{name:"user_id"})
  userId!: string;
}
