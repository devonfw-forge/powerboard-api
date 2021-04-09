import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { TeamsModule } from './web-app/teams/teams.module';
import { BusinessUnitsModule } from './web-app/business-units/business-units.module';
import { ClientStatusModule } from './web-app/client-status/client-status.module';
import { SprintModule } from './web-app/sprint/sprint.module';
import { TeamSpiritModule } from './web-app/team-spirit/team-spirit.module';
import { CodeQualitySnapshotModule } from './web-app/code-quality-snapshot/code-quality-snapshot.module';

@Module({
  imports: [
    CoreModule,
    TeamsModule,
    BusinessUnitsModule,
    ClientStatusModule,
    CodeQualitySnapshotModule,
    SprintModule,
    TeamSpiritModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
