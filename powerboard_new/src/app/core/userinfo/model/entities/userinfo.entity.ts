import { BaseEntity } from '../../../../shared/model/entities/base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserInfo extends BaseEntity {
  @Column('varchar', { name: 'first_name', length: 255, nullable: false })
  firstName!: string;

  @Column('varchar', { name: 'last_name', length: 255, nullable: true })
  lastName!: string;

  @Column('varchar', { length: 255, nullable: true })
  center!: string;

  @Column('varchar', { length: 255, nullable: false })
  email!: string;

  @Column('varchar', { name: 'team_spirit_name', length: 255, nullable: true })
  teameSpiritName!: string;
}
