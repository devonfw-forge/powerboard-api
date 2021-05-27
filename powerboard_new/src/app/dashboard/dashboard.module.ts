import { Module } from '@nestjs/common';
import { BusinessUnitsModule } from './business-units/business-units.module';
import { ClientStatusModule } from './client-status/client-status.module';
import { SprintModule } from './sprint/sprint.module';
import { TeamSpiritModule } from './team-spirit-integration/team-spirit.module';
import { CodeQualitySnapshotModule } from './code-quality-snapshot/code-quality-snapshot.module';

@Module({
  imports: [BusinessUnitsModule, ClientStatusModule, CodeQualitySnapshotModule, SprintModule, TeamSpiritModule],
  controllers: [],
  providers: [],
  exports: [BusinessUnitsModule, ClientStatusModule, CodeQualitySnapshotModule, SprintModule, TeamSpiritModule],
})
export class DashboardModule {}
