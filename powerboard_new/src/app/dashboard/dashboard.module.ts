import { Module } from '@nestjs/common';

import { ClientStatusModule } from './client-status/client-status.module';
import { SprintModule } from './sprint/sprint.module';
import { TeamSpiritModule } from './team-spirit-integration/team-spirit.module';
import { CodeQualitySnapshotModule } from './code-quality-snapshot/code-quality-snapshot.module';
import { ADCenterModule } from './ad-center/ad-center.module';
import { BusinessUnitsModule } from './business-units/business-units.module';

@Module({
  imports: [ADCenterModule, ClientStatusModule, CodeQualitySnapshotModule, SprintModule, TeamSpiritModule,BusinessUnitsModule],
  controllers: [],
  providers: [],
  exports: [ADCenterModule, ClientStatusModule, CodeQualitySnapshotModule, SprintModule, TeamSpiritModule],
})
export class DashboardModule {}
