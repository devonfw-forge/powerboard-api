import { Module } from '@nestjs/common';
import { Team } from './model/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamCrudService } from './services/team.crud.service';
import { TeamCrudController } from './controllers/team.crud.controller';
import { BusinessUnit } from '../business-units/model/entities/business-unit.entity';
import { User } from '../../core/user/model/entities/user.entity';
import { CodeQualitySnapshotCrudService } from '../code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { CodeQualitySnapshot } from '../code-quality-snapshot/model/entities/code-quality-snapshot.entity';
import { ClientStatusCrudService } from '../client-status/services/client-status.crud.service';
import { ClientStatus } from '../client-status/model/entities/client-status.entity';
import { TeamSpirit } from '../team-spirit/model/entities/team-spirit.entity';
import { TeamSpiritCrudService } from '../team-spirit/services/team-spirit.crud.service';
import { SprintCrudService } from '../sprint/services/sprint.crud.service';
import { Sprint } from '../sprint/model/entities/sprint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Team, BusinessUnit, User, CodeQualitySnapshot, ClientStatus, TeamSpirit, Sprint]),
  ],
  providers: [
    TeamCrudService,
    CodeQualitySnapshotCrudService,
    ClientStatusCrudService,
    TeamSpiritCrudService,
    SprintCrudService,
  ],
  controllers: [TeamCrudController],
  exports: [TeamCrudService],
})
export class TeamsModule {}
