import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { BusinessUnitsModule } from './business-units/business-units.module';
import { ClientStatusModule } from './client-status/client-status.module';
import { SprintModule } from './sprint/sprint.module';
import { TeamSpiritModule } from './team-spirit/team-spirit.module';
import { CodeQualitySnapshotModule } from './code-quality-snapshot/code-quality-snapshot.module';

@Module({
  imports: [
    TeamsModule,
    BusinessUnitsModule,
    ClientStatusModule,
    CodeQualitySnapshotModule,
    SprintModule,
    TeamSpiritModule,
  ],
  controllers: [],
  providers: [],
})
export class DashboardModule {}
