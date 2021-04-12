import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ElectronAppModule } from './electron-app/electron-app.module';


@Module({
  imports: [
    CoreModule,
    DashboardModule,
    ElectronAppModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
