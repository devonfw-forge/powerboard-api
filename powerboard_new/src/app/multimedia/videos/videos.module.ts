import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosCrudController } from './controllers/videos.crud.controller';
import { Videos } from './model/entities/videos.entity';
import { VideosCrudService } from './services/videos.crud.service';

@Module({
  imports: [TypeOrmModule.forFeature([Videos])],
  providers: [VideosCrudService],
  controllers: [VideosCrudController],
  exports: [VideosCrudService],
})
export class VideosModule {}
