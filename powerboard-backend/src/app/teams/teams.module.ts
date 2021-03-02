import { Module } from '@nestjs/common';
import { Team } from './model/entities/team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamCrudService } from './services/team.crud.service';
import { TeamCrudController } from './controllers/team.crud.controller';
import { BusinessUnit } from '../business-units/model/entities/business-unit.entity';
import { User } from '../core/user/model/entities/user.entity';
import { CodeQualitySnapshotCrudService } from '../code-quality-snapshot/services/code-quality-snapshot.crud.service';
import { CodeQualitySnapshot } from '../code-quality-snapshot/model/entities/code-quality-snapshot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, BusinessUnit, User, CodeQualitySnapshot])],
  providers: [TeamCrudService, CodeQualitySnapshotCrudService],
  controllers: [TeamCrudController],
  exports:[TeamCrudService],
})
export class TeamsModule {}
