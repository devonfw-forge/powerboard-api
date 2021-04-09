import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { ElectronAppModule } from './electron-app/electron-app.module';
import { WebAppModule } from './web-app/web-app.module';

@Module({
  imports: [
    CoreModule,
    WebAppModule,
    ElectronAppModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
